import { Router } from 'express';
import { version } from '../../package.json';
import competitions from './competitions';
import stages from './stages';
import participants from './participants';
import rounds from './rounds';
import throws from './throws';
import players from './players';

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
    api.use('/participants', participants({ config, db }));
    api.use('/rounds', rounds({ config, db }));
    api.use('/throws', throws({ config, db }));
    api.use('/players', players({ config, db }));

    return api;
};
 
