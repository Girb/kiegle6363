import { Router } from 'express';
import { version } from '../../package.json';
import competitions from './competitions';
import stages from './stages';

export default ({ config, db }) => {
    const api = Router();

    api.get('/', (req, res) => {
        res.json({ version });
    });

    api.get('/test', (req, res) => {
        db.any('select * from participant').then((data) => {
            res.status(200).json(data);
        })
            .catch((err) => {
                res.status(500).json(err);                
            });
    });

    api.use('/competitions', competitions({ config, db }));
    api.use('/stages', stages({ config, db }));

    return api;
};
 
