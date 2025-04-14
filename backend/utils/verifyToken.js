import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.signedCookies?.token || 
                 req.cookies?.token || 
                 req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.clearCookie('token');
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session expired, please login again"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};