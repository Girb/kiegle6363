import winston, { transports, format } from 'winston';

const Logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY.MM.DD HH:mm:ss',
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: './server.log' }),
        new transports.Console(),
    ],
});

export default Logger;
