/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import { User } from '../models';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  const { authorization } = req.headers;
  const token = req.headers.token
    || req.query.token
    || (authorization && authorization.slice(7));
  if (!token) {
    return res.status(403).json({
      success: false,
      errors: ['Unauthorized! Please login to perform this operation'],
    });
  }
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        errors: ['Your session has expired, please login again to continue'],
      });
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({
        success: false,
        errors: ['Invalid auth, please login again to continue'],
      });
    }
    req.user = user;
    return next();
  });
};
