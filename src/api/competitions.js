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

    api.get('/:id/participants/:status', (req, res) => {
        db.any(`select pa.id, player.id as player_id, player.firstname, player.lastname, player.nickname, player.email, club.name as club, pa.sort_order, pa.status_id from participant pa
                inner join player on pa.player_id = player.id
                inner join club on player.club_id = club.id
                where competition_id = $1 AND pa.status_id = $2 order by pa.sort_order ASC;`, [req.params.id, req.params.status]).then((data) => {
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
