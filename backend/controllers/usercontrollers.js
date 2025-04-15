import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenmanager.js";
import {
  sendPasswordResetEmail,
  sendResetPasswordSuccess
} from "../services/email.js";
import { randomBytes } from "crypto";

const CLIENT_URL = "https://nexus-ai-chatbotv1.onrender.com";

// Cookie configuration
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  domain: ".https://nexus-ai-chatbotv1.onrender.com"
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser._id, cookieOptions);
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    generateToken(res, user._id, cookieOptions);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const Signout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ 
      success: true, 
      message: "Signed out successfully" 
    });
  } catch (error) {
    console.error("Signout error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to sign out" 
    });
  }
};

export const CheckAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists for security
      return res.status(200).json({ 
        success: true, 
        message: "If an account exists, a reset link has been sent" 
      });
    }

    const resetToken = randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email, 
      `${CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({ 
      success: true, 
      message: "Password reset link sent" 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: "Passwords do not match" 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 8 characters" 
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetPasswordSuccess(user.email, user.name);

    res.status(200).json({ 
      success: true, 
      message: "Password updated successfully" 
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};