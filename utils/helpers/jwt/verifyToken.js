import jwt from 'jsonwebtoken';

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret); //** verifing token
};

export default verifyToken;