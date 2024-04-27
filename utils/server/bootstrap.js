import mongoose from "mongoose";
import colors from 'colors';
import { errorLogger, logger } from "../helpers/logger/logger.js";
import config from "./config.js";
import { connectToQueue } from "./messageQueue.js";

//! server related works
process.on('uncaughtException', error => {
    console.log('uncaught Exception detect!');
    errorLogger.error('uncaught Exception detect!');
    process.exit(1);
});


let server;

const bootstrap = async (app) => {
    try {
        await mongoose.connect(config.MONGO_CONNECTION);
        console.log(colors.red(`Database is connected successfully`));
        logger.info(colors.red(`Database is connected successfully`)); //? store logs on log file

        server = app.listen(config.PORT, () => {
            logger.info(colors.magenta(`Listening on port http://localhost:${config.PORT}/api/v1`)); //? store logs on log file
            console.log(colors.magenta(`Listening on port http://localhost:${config.PORT}/api/v1`));
        });
    } catch (err) {
        errorLogger.error('Failed to connect database', err); //? store logs on log file
    }

    process.on('unhandledRejection', error => {
        console.log('unhandled Rejection detect! server closing...');
        if (server) {
            server.close(() => {
                errorLogger.error(error); //? store logs on log file
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

export default bootstrap;
