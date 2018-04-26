import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.get('/:id', (req, res) => {
        const sql = `select pl.id, pl.firstname || ' ' || pl.lastname as name, count(score) as count, sum(score) as score, r.status_id from round r
        INNER JOIN participant pa ON r.participant_id = pa.id
        INNER JOIN player pl ON pa.player_id = pl.id
        INNER JOIN throw t ON t.round_id = r.id
        WHERE r.stage_id = $1
        GROUP BY pl.id, r.id`;
        db.any(sql, req.params.id).then((data) => {
            const map = new Map();
            data.forEach((row) => {
                if (!map.has(row.name)) {
                    map.set(row.name, { 
                        rounds: [

                        ],
                    });
                }
                map.get(row.name).rounds.push({ score: row.score, count: row.count, status: row.status_id });
            });
            res.json(map);
        });
    });


    return api;
};
