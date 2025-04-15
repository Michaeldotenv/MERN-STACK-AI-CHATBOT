import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import { clearAuthCookies } from '../utils/tokenmanager.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.signedCookies?.token ||
      req.cookies?.token ||
      req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId).select('-password -__v');
    if (!user) {
      clearAuthCookies(res);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    clearAuthCookies(res);
    const message = error instanceof jwt.TokenExpiredError
      ? 'Session expired'
      : error instanceof jwt.JsonWebTokenError
      ? 'Invalid token'
      : 'Authentication failed';

    return res.status(401).json({ success: false, message });
  }
};
