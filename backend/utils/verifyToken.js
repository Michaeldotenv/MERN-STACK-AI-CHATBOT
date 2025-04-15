import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

// Enhanced token verification middleware
export const verifyToken = async (req, res, next) => {
  try {
    // Multiple token sources with proper fallback
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

    // Verify token with proper error handling
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user with cache consideration
    const user = await User.findById(decoded.userId)
      .select('-password -__v')
      .cache(decoded.userId); // Optional caching

    if (!user) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return res.status(404).json({
        success: false,
        message: "User account not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Attach user to request
    req.user = user;
    req.token = token;
    next();
    
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    
    // Always clear invalid tokens
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

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