import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.delete('/:id', (req, res) => {
      db.none('DELETE from round where id = $1', req.params.id).then(() => {
        res.end();
      }).catch((err) => {
        res.status(500).json(err);
      });
    });

    api.get('/:id', (req, res) => {
        db.task(t => {
            return t.batch([
                db.one(`select r.id, r.status_id, p.player_id, pl.firstname, pl.lastname, pl.nickname, pl.email, c.id as club_id, c.name as club, comp.title as competition
                        from round r
                        INNER JOIN participant p ON r.participant_id = p.id
                        INNER JOIN player pl ON p.player_id = pl.id
                        INNER JOIN club c ON pl.club_id = c.id
                        INNER JOIN competition comp ON r.competition_id = comp.id
                        where r.id = $1`, req.params.id),
                db.any('select id, score from throw where round_id = $1 order by id', req.params.id)
            ]);
        }).then(data => {
            const ret = data[0];
            ret.throws = data[1];
            res.json(ret);
        }).catch(err => {
            res.status(500).json(err);
        })
    });

    return api;

};

/*select r.id, r.participant_id, r.status_id, p.player_id, p.sort_order, p.status_id as participant_status_id, pl.firstname, pl.lastname, pl.nickname, cl.name as club
from round r
INNER JOIN participant p ON r.participant_id = p.id
INNER JOIN player pl ON p.player_id = pl.id
INNER JOIN club cl ON pl.club_id = cl.id
;
*/


/*

select r.*, array_agg(score)
from throw t
INNER JOIN rounds r ON t.round_id = r.id
where round_id IN (
  select id from rounds where status_id IN (0,1)
)
GROUP BY r.player_id, r.firstname, r.lastname, r.nickname, r.club, r.sort_order, r.id, r.status_id, r.participant_id, r.participant_status_id, r.competition_id;


*/