import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    PORT: process.env.PORT,
    MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    ENVIRONMENT: process.env.ENVIRONMENT,

    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_SECRET_ADMIN: process.env.TOKEN_SECRET_ADMIN,

    TOKEN_SECRET_EXP: process.env.TOKEN_SECRET_EXP,

    BYCRYPT_SALT_ROUND: process.env.BYCRYPT_SALT_ROUND,

    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_ID: process.env.GMAIL_ID,
};