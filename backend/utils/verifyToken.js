import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import { clearAuthCookies } from '../utils/tokenmanager.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.signedCookies?.token || 
                 req.cookies?.token || 
                 req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        code: "AUTH_REQUIRED"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    const user = await User.findById(decoded.userId).select('-password -__v');

    if (!user) {
      clearAuthCookies(res);
      return res.status(404).json({
        success: false,
        message: "User account not found",
        code: "USER_NOT_FOUND"
      });
    }

    req.user = user;
    next();
    
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    clearAuthCookies(res);

    const response = {
      success: false,
      message: "Authentication failed"
    };

    if (error instanceof jwt.TokenExpiredError) {
      response.message = "Session expired";
      response.code = "TOKEN_EXPIRED";
      return res.status(401).json(response);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      response.message = "Invalid token";
      response.code = "INVALID_TOKEN";
      return res.status(401).json(response);
    }

    response.message = "Authentication error";
    response.code = "AUTH_ERROR";
    res.status(500).json(response);
  }
};