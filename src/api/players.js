import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();
    api.get('/notincompetition/:id', (req, res) => {
        db.any(`select p.*, c.name as club
                from player p
                INNER JOIN club c ON p.club_id = c.id
                where p.id NOT IN (select player_id from participant where competition_id = 1)`,
        req.params.id).then((data) => {
            res.json(data);            
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    return api;
};