import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({
    exposedHeaders: config.corsHeaders,
}));
app.use(bodyParser.json({
    limit: config.bodyLimit,
}));

initDb((db) => {
    app.use('/api', api({ config, db }));

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
});


export default app;
