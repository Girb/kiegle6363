import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.get('/:id', (req, res) => {
        const createRow = function (rx) {
            return {
                player: { id: rx.playerid, name: rx.name, nickname: rx.nickname },
                rounds: [],
            };
        };
        const sql = `select pl.id as playerid, pl.firstname || ' ' || pl.lastname as name, pl.nickname, count(score) as count, sum(score) as score, r.status_id, r.id as roundid
            FROM round r
            INNER JOIN participant pa ON r.participant_id = pa.id
            INNER JOIN player pl ON pa.player_id = pl.id
            INNER JOIN throw t ON t.round_id = r.id
            WHERE r.stage_id = $1
            GROUP BY pl.id, r.id`;
        db.any(sql, req.params.id).then((data) => {
            const rows = [];
            data.forEach((row) => {
                let existing = rows.find(rx => rx.player.id === row.playerid);
                if (!existing) {
                    existing = createRow(row);
                    rows.push(existing);
                }
                existing.rounds.push({ id: row.roundid, score: row.score, count: row.count, status: row.status_id });
            });
            res.json(rows);
        });
    });

    return api;
};
