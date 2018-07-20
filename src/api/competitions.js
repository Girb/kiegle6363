import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.get('/', (req, res) => {
        console.log('getting all');
        db.any(`select c.id, c.title, ct.title as type from competition c
                INNER JOIN competition_type ct ON c.type_id = ct.id`).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.get('/:id', (req, res) => {
        db.one('select * from competition where id = $1', req.params.id).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.get('/:id/participants/:status', (req, res) => {
        db.any(`select * from participants
                where competition_id = $1 AND status_id = $2 order by sort_order ASC;`, [req.params.id, req.params.status]).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/players', (req, res) => {
        db.any('select * from player where id IN (select player_id from participant where competition_id = $1)', req.params.id).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/players/add', (req, res) => {
        db.any(`select player.id, firstname, lastname, nickname, email, cl.name as club from player
                INNER JOIN club cl on club_id = cl.id
                where player.id NOT IN (select player_id from participant where competition_id = 2) ORDER BY club, firstname;;`, req.params.id).then((data) => {
            res.json(data);
        });         
    });

    api.post('/:id/players/add/:playerid', (req, res) => {
        db.one('select max(sort_order)+1 as sortorder from participant where competition_id = $1;', req.params.id).then((data) => {
            db.one('INSERT INTO participant (competition_id, player_id, sort_order) VALUES ($1, $2, $3) RETURNING id;', [req.params.id, req.params.playerid, data.sortorder]).then((ret) => {
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
    
    api.get('/:id/rounds', (req, res) => {
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

