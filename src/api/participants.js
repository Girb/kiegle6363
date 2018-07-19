import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.post('/sort', (req, res) => {
        db.tx((t) => {
            const ts = [];
            req.body.forEach((ox) => {
                ts.push(t.none('UPDATE participant SET sort_order = $1 where id = $2', [ox.sortOrder, ox.id]));
            });
            return t.batch(ts);
        }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.delete('/:id', (req, res) => {
        db.none('DELETE FROM participant where id = $1', req.params.id).then(() => {
            res.end();
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.post('/:id/status/:statusid', (req, res) => {
        db.none('UPDATE participant SET status_id = $1 WHERE id = $2', [parseInt(req.params.statusid), parseInt(req.params.id)]).then(() => {
            res.end();
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    return api;
};
