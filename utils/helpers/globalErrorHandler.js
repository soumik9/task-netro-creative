import ApiError from '../errors/ApiError.js';
import handleValidationError from '../errors/handleValidationError.js';
import handleCastError from '../errors/handleCastError.js';
import config from '../server/config.js';
import { errorLogger } from './logger/logger.js';

const globalErrorHandler = (
    error,
    req,
    res,
    next
) => {

    //? handle store errors when application on production mode
    config.ENVIRONMENT === 'development'
        ? console.log('global error handler ~ ', error)
        : errorLogger.error('global error handler ~ ', error);

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];

    //! validation error
    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') { //! mongodb id cast error handle
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) { //! custom api error handler
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;