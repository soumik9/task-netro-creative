import jwt from 'jsonwebtoken'
import config from '../../server/config.js';

export default (data, isAdmin = false) => {

  //** data to be stored in token
  const payload = {
    email: data.email,
    role: data.role,
    _id: data._id,
  };

  //** createing token with data
  const token = jwt.sign(
    payload,
    isAdmin ? config.TOKEN_SECRET_ADMIN : config.TOKEN_SECRET,
    { expiresIn: config.TOKEN_SECRET_EXP }
  );

  return token;
};