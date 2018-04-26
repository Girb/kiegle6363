import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();

    api.get('/', (req, res) => {
        console.log('getting all');
        db.any('select * from competition').then((data) => {
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

    api.get('/:id/participants', (req, res) => {
        db.any('select * from participant where competition_id = $1', req.params.id).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/players', (req, res) => {
        db.any('select * from player where id IN (select player_id from participant where competition_id = $1)', req.params.id).then((data) => {
            res.json(data);
        });
    });

    api.get('/:id/stages', (req, res) => {
        db.any('select * from stage where competition_id = $1', req.params.id).then((data) => {
            res.json(data);
        });
    });

    return api;
    
};
