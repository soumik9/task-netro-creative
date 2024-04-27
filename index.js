import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import httpStatus from 'http-status';
import 'dotenv/config'

//** custom imports
import routes from './app/routers/routes.js';
import bootstrap from './utils/server/bootstrap.js';
import globalErrorHandler from './utils/helpers/globalErrorHandler.js';
import limiter from './utils/server/limiter.js';

const app = express();

//** middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(limiter) //? apply rate limitter

//** all routes
app.use('/api/v1', routes);

//** files route
app.use('/public', express.static('public'))

//! global error handler
app.use(globalErrorHandler);

//! handle not found
app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
});

//** database and server connection
bootstrap(app);

//! to send a signal to terminate server
process.on('SIGTERM', () => {
    logger.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});