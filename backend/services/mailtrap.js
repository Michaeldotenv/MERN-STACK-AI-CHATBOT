import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with Mailtrap SMTP
export const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER || "api", // Fallback to "api" if not in .env
    pass: process.env.MAILTRAP_PASS ||"e8eb0272fa1ce233731efabce7fc8144" // Fallback to your key
  }
});

