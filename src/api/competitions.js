import { Router } from 'express';
import _ from 'underscore';
import Logger from '../Logger';

export default ({ config, db }) => {
    const api = Router();

    api.get('/', (req, res) => {
        Logger.info('get all competitions');
        db.any(`select c.id, c.title, ct.throws_per_round, ct.number_of_rounds, ct.title as type from competition c
                INNER JOIN competition_type ct ON c.type_id = ct.id`).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.post('/new', (req, res) => {
        Logger.info('create new competitions');
        db.one('INSERT INTO competition (title, type_id) VALUES ($1, $2) RETURNING id', [req.body.title, req.body.type_id]).then(id => (
            res.json({
                id,
                title: req.body.title,
                type_id: req.body.type_id,
            })
        ));
    });
    
    api.get('/:id', (req, res) => {
        Logger.info(`get competition ${req.params.id}`);
        db.one(`select c.id, c.title, c.type_id, ct.throws_per_round, ct.number_of_rounds, ct.title as type
        from competition c
        INNER JOIN competition_type ct ON c.type_id = ct.id
        where c.id = $1`, req.params.id).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.get('/:id/participants/:status', (req, res) => {
        Logger.info(`get participants from competition ${req.params.id} with status ${req.params.status}`);
        db.any(`select * from participants
                where competition_id = $1 AND status_id = $2 order by sort_order ASC;`, [req.params.id, req.params.status]).then((data) => {
            res.json(data);
        });
    }); 

    api.get('/:id/players', (req, res) => {
        Logger.info(`get players from competition ${req.params.id}`);
        db.any('select * from player where id IN (select player_id from participant where competition_id = $1)', req.params.id).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/players/add', (req, res) => {
        Logger.info(`get player to add to competition ${req.params.id}`);
        db.any(`select player.id, firstname, lastname, nickname, email, cl.name as club from player
                INNER JOIN club cl on club_id = cl.id
                where player.id NOT IN (select player_id from participant where competition_id = $1) ORDER BY club, firstname;`, req.params.id).then((data) => {
            res.json(data);
        });         
    });

    api.post('/:id/players/add/:playerid', (req, res) => {
        Logger.info(`add player with id ${req.params.playerid} to competition ${req.params.id}`);
        db.one('select coalesce(max(sort_order), 0)+1 as sortorder from participant where competition_id = $1;', req.params.id).then((data) => {
            db.one('INSERT INTO participant (competition_id, player_id, sort_order, prev1, prev2) VALUES ($1, $2, $3, $4, $5) RETURNING id;', [req.params.id, req.params.playerid, data.sortorder, req.body.prev1, req.body.prev2]).then((ret) => {
                db.one('SELECT * from participants where id = $1', ret.id).then((data) => {
                    res.json(data);
                });
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    });

    api.get('/:id/stages', (req, res) => {
        db.any('select * from stage where competition_id = $1', req.params.id).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/results/kvp', (req, res) => {
        db.any('')        
    });

    function participant(roundrow) {
        return { 
            participant_id: roundrow.participant_id, 
            rounds: [], 
            lastname: roundrow.lastname, 
            firstname: roundrow.firstname, 
            nickname: roundrow.nickname,
            club: roundrow.club,
        };
    }

    function round(roundrow) {
        return { 
            throws: roundrow.throws, 
            id: roundrow.id, 
            status_id: roundrow.status_id,
            sum: roundrow.throws.reduce((a, b) => a + b, 0),
        };
    }

    function best2(p) {
        const rounds = _.sortBy(p.rounds, r=> -parseInt(r.sum || 0));
        const rx = rounds.map(r=>parseInt(r.sum || 0));
        if( rx.length > 1 ) return [rx[0], rx[1]];
        if( rx.length === 1 ) return [rx[0]];
        return [];
    }
    function best2sum(p) {
        return best2(p).reduce((x,b) => x+b,0);
    }
    
    api.get('/:id/rounds/:status?', (req, res) => {
        Logger.info(`get rounds from competition ${req.params.id} with status ${req.params.status || '[not set]'}`);
        db.task(t => t.batch([
            t.any(`select p.id, p.prev1, p.prev2, pl.firstname, pl.lastname, pl.nickname, cl.name as club, array_agg(r.id) as round_ids
                        from participant p
                        left outer join round r on r.participant_id = p.id
                        inner join player pl on p.player_id = pl.id
                        inner join club cl on pl.club_id = cl.id
                        where p.status_id IN ($2:csv) and p.competition_id = $1
                        group by p.id, pl.id, cl.id
                        order by p.sort_order`, [req.params.id, req.params.status || [1, 2]]),
            t.any(`select r.id, r.participant_id, sum(t.score), count(t.score), array_agg(score order by t.id) as throws
                        from round r
                        inner join throw t on t.round_id = r.id
                        where r.competition_id = $1
                        group by r.id
                `, req.params.id),
        ])).then((data) => {
            const ret = [];
            data[0].forEach((p) => {
                const px = p;
                px.rounds = data[1].filter(r => r.participant_id === p.id);
                px.best2 = best2(px);
                px.best2sum = best2sum(px);
                ret.push(px);
            });
            res.json(ret);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.post('/:id/rounds/new', (req, res) => {
        Logger.info(`create new round for participant ${req.body.participant_id} in competition ${req.params.id}`);
        db.one('insert into round (participant_id, competition_id) values ($1, $2) returning *', [req.body.participant_id, req.params.id]).then((round) => {
            db.tx((t) => {
                const qs = [],
                    throwcount = req.body.throws_per_round;
                for (let i = 0; i < throwcount; i += 1) {
                    qs.push(t.none(`insert into throw (round_id) values (${round.id})`));
                }
                return t.batch(qs);
            }).then(() => {
                res.json(round);
            }).catch((err) => {
                res.status(500).json(err);
            });
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.get('/:id/roundsasdf', (req, res) => {
        db.any(`select r.*, array_agg(score) as throws
                from throw t
                INNER JOIN rounds r ON t.round_id = r.id
                WHERE competition_id = $1
                GROUP BY r.player_id, r.firstname, r.lastname, r.nickname, r.club, r.sort_order, r.id, r.status_id, r.participant_id, r.participant_status_id, r.competition_id`, req.params.id).then((data) => {
            const ret = [];
            data.forEach((row) => {
                let p = ret.find(x => x.participant_id === row.participant_id);
                if (!p) {
                    p = participant(row);
                    ret.push(p);
                }
                p.rounds.push(round(row));
            });

            res.json(ret);
        });
    });

    return api;
};

