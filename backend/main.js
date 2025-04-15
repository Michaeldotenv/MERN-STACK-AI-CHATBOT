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

const app = express();
const PORT = 5000; // Hardcoded port

// Hardcoded configurations
const FRONTEND_URL = "https://nexus-ai-chatbotv1.onrender.com";
const JWT_SECRET = "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi"; // Replace with your actual secret
const COOKIE_DOMAIN = "nexus-ai-chatbotv1.onrender.com";

// Enhanced CORS configuration (hardcoded)
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
app.use(cookieParser(JWT_SECRET)); // Using hardcoded secret

// Logging
app.use(morgan('dev')); // Always show dev logs in this hardcoded version

// API Routes
app.use('/api/v1', userRoutes);
app.use('/api/chat', chatRoutes);

// Serve static files from React
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing - return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is working 🎉');
});

// Error handling
app.use(errorHandler);

// Database connection and server start
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