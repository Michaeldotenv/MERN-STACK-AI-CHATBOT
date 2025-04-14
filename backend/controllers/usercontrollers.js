import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenmanager.js";
import {
    sendVerificatoinEmail,
    sendWelcomeEmail,
    sendSignOutEmail,
    sendPasswordResetEmail,
    sendResetPasswordSuccess
  } from "../services/email.js";
  import { randomBytes } from "crypto";
const CLIENT_URL = "https://nexus-ai-chatbotv1.onrender.com"

  export const Signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const verificationToken = Math.floor(100000 + Math.random() * 90000).toString();
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
      });
  
      generateToken(res, newUser._id);
      await sendVerificatoinEmail(newUser.email, verificationToken);
  
      res.status(201).json({
        success: true,
        message: "User created successfully!",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isVerified: newUser.isVerified
        }
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const VerifyEmail = async (req, res) => {
    try {
      const { code } = req.body;
  
      // 1. Find user with matching verification token
      const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: new Date() } // Use Date object directly
      });
  
      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid or expired verification code." 
        });
      }
  
      // 2. Verify the token hasn't expired (additional check)
      const now = new Date();
      if (user.verificationTokenExpiresAt <= now) {
        return res.status(400).json({
          success: false,
          message: "Verification code has expired."
        });
      }
  
      // 3. Update user verification status
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();
  
      // 4. Send welcome email (optional)
      await sendWelcomeEmail(user.email, user.name);
  
      res.status(200).json({ 
        success: true, 
        message: "Email verified successfully!" 
      });
      
    } catch (error) {
      console.error("Email verification error:", error);
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
        return res.status(400).json({ success: false, message: "Email not registered" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      generateToken(res, user._id);
      user.lastLogin = new Date();
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        currentUser: { ...user._doc, password: undefined }
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const Signout = async (req, res) => {
    try {
      res.clearCookie("token");
  
      const user = await User.findById(req.userId);
      if (user) {
        await sendSignOutEmail(user.email, user.name);
      }
  
      res.status(200).json({ success: true, message: "Signed out successfully" });
    } catch (error) {
      console.error("Signout error:", error);
      res.status(500).json({ success: false, message: "Failed to sign out" });
    }
  };
  
  export const ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(200).json({ message: "An account doesn't exist with this email" });
      }
  
      const resetToken = randomBytes(20).toString("hex");
      const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = resetTokenExpiresAt;
      await user.save();
  
      await sendPasswordResetEmail(user.email, `${CLIENT_URL}/reset-password/${resetToken}`);
      res.status(201).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const ResetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;
  
      if (!password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Password and confirmation are required" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
      }
  
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
      }
  
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired reset link" });
      }
  
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();
  
      await sendResetPasswordSuccess(user.email, user.name);
  
      res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const CheckAuth = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ success: false, message: "Unauthorized, no token provided" });
      }
  
      res.status(200).json({
        success: true,
        user: { ...user._doc, password: undefined }
      });
    } catch (error) {
      console.error("Check auth error:", error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  };
  
