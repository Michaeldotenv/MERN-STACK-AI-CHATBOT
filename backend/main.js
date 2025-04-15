import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Centralized configurations
const PORT = 5000;
const FRONTEND_URL = "https://nexusai-chatbot.vercel.app";
const JWT_SECRET = "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";
const COOKIE_DOMAIN = "nexusai-chatbot.vercel.app";

// Set as environment variables for compatibility
process.env.JWT_SECRET = JWT_SECRET;
process.env.NODE_ENV = "production";
process.env.JWT_EXPIRES_IN = "7d";

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    FRONTEND_URL,
    "http://localhost:5174"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  exposedHeaders: ['set-cookie']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));
app.use(morgan('dev'));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/chat', chatRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is working 🎉');
});

// React fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Error handling
app.use(errorHandler);

// Database + Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`CORS configured for: ${FRONTEND_URL}`);
      console.log(`Cookie domain: ${COOKIE_DOMAIN}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
