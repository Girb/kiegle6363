const winston = require('winston');

const type = process.env.PROCESS_TYPE || 'development';
const logger = winston.createLogger({ level: 'info', transports: [new winston.transports.Console({ format: winston.format.simple() })] });

logger.info(`Starting in ${type} mode`);
require('./web');
