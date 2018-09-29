import { Router } from 'express';

export default ({ config, db }) => {
    const api = Router();
    api.get('/notincompetition/:id', (req, res) => {
            db.any(`select p.*, c.name as club
                from player p
                INNER JOIN club c ON p.club_id = c.id
                where p.id NOT IN (select player_id from participant where competition_id = $1)
                ORDER BY firstname, lastname`,
        [req.params.id]).then((data) => { 
            res.json(data);            
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    api.get('/clubs', (req, res) => {
        db.any('SELECT * from club ORDER BY name').then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    });

    api.post('/', (req, res) => {
        db.one('INSERT INTO player (firstname, lastname, club_id) VALUES ($1, $2, $3) RETURNING id', [req.body.firstname, req.body.lastname, req.body.club_id]).then((id) => {
            res.json({
                id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            });
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    return api;
};