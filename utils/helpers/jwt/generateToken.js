import jwt from 'jsonwebtoken'

export default (data) => {
  const payload = {
    email: data.email,
    role: data.role,
    _id: data._id,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_SECRET_EXP });
  return token;
};