import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //! 15 minutes
    limit: 35, //! Limit each IP to 100 requests per `window`
    message: 'You have received too many requests from this IP. Please try again after 15 minutes.'
})

export default limiter