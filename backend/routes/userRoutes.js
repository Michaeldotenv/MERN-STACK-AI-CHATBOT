import express from 'express';
const router = express.Router();

// Import controllers
import { 
  Signup, 
  Signin, 
  Signout, 
  CheckAuth,
  ForgotPassword,
  ResetPassword
} from '../controllers/usercontrollers.js';

// Import validators and middleware
import { 
  loginValidator, 
  signUpValidator, 
  validate 
} from '../utils/validators.js';

import { verifyToken } from '../utils/verifyToken.js';

// Define routes with enhanced security
router.get("/check-auth", 
  verifyToken, 
  (req, res, next) => {
    // Add cache control for sensitive data
    res.set('Cache-Control', 'no-store, max-age=0');
    next();
  }, 
  CheckAuth
);

router.post("/signup", 
  validate(signUpValidator),
  (req, res, next) => {
    // Security headers for auth endpoints
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    });
    next();
  },
  Signup
);

router.post("/signin", 
  validate(loginValidator),
  (req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    });
    next();
  },
  Signin
);

router.post("/signout",
  // Clear cookies even if not authenticated
  (req, res, next) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'nexus-ai-chatbotv1.onrender.com',
      path: '/'
    });
    next();
  },
  Signout
);

router.post('/forgot-password', 
  (req, res, next) => {
    // Rate limiting could be added here
    next();
  },
  ForgotPassword
);

router.post('/reset-password/:token', 
  (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  },
  ResetPassword
);

export default router;