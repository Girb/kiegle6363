import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.post('/', (req, res) => {
        db.none('update throw set score = $1 where id = $2', [req.body.score, req.body.id]).then(() => {
            res.end();
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    return api;
};
