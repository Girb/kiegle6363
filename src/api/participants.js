import { Router } from 'express';
import Logger from '../Logger';

export default ({ config, db }) => {
    const api = Router();

    api.post('/sort', (req, res) => {
        Logger.info(`update sortorder`);
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
        Logger.info(`delete participant ${req.params.id}`);
        db.none('DELETE FROM participant where id = $1', req.params.id).then(() => {
            res.end();
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.post('/:id/status/:statusid', (req, res) => {
        Logger.info(`set status for participant ${req.params.id} to ${req.params.statusid}`);
        db.none('UPDATE participant SET status_id = $1, sort_order = (select coalesce(max(sort_order),0)+1 from participant where status_id = $1 AND competition_id = (select competition_id from participant where id = $2)) WHERE id = $2', [parseInt(req.params.statusid), parseInt(req.params.id)]).then(() => {
            res.end();
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    return api;
};
