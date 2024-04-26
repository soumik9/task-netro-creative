import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format
import path from 'path'

const customFormat = printf(({ level, message, label, timestamp }) => {

    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${date.toDateString} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

//? success logger process
const logger = createLogger({
    level: 'info',
    format: combine(label({ label: 'right now!' }), timestamp(), customFormat, prettyPrint()),
    transports: [
        // new transports.Console(), //** console with winster 
        new transports.File({
            filename: path.join(process.cwd(), 'logs', 'success.log'), //** file location set
            level: 'info' //** success console stores
        }),
    ],
});

//? error logger process
const errorLogger = createLogger({
    level: 'error',
    format: combine(label({ label: 'right now!' }), timestamp(), customFormat, prettyPrint()),
    transports: [
        new transports.Console(), //** console with winster 
        new transports.File({
            filename: path.join(process.cwd(), 'logs', 'error.log'), //** file location set
            level: 'error' //** error console stores
        }),
    ],
});

export { logger, errorLogger };