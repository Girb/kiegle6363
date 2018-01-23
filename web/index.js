import http from 'http';
import promisify from 'es6-promisify';
import app from './server';

const server = http.createServer(app.callback());
const winston = require('winston');
const logger = winston.createLogger({ level: 'info', transports: [new winston.transports.Console({ format: winston.format.simple() })] });

const serverListen = promisify(server.listen, server);
serverListen(6363)
  .then(() => logger.info('Listening on port 6363'))
  .catch((err) => {
    logger.error('Error during startup', err);
    process.exit(1);
  });

