// routes/userRoutes.js
import express from 'express';
const router = express.Router();

// Import controllers
import { 
  getAllUsers, 
  Signup, 
  Signin, 
  Signout, 
  CheckAuth,
  VerifyEmail,
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

// Define routes
router.get("/check-auth", verifyToken, CheckAuth);
router.get("/", getAllUsers);
router.post("/signup", validate(signUpValidator), Signup);
router.post("/signin", validate(loginValidator), Signin);
router.post("/signout", Signout);
router.post('/verify-email', VerifyEmail);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password/:token', ResetPassword);


export default router;