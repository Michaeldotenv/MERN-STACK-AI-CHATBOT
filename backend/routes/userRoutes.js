// routes/userRoutes.js
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

// Define routes
router.get("/check-auth", verifyToken, CheckAuth);
router.post("/signup", validate(signUpValidator), Signup);
router.post("/signin", validate(loginValidator), Signin);
router.post("/signout", Signout);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password/:token', ResetPassword);


export default router;