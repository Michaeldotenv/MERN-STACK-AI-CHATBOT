import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from './middleware/errorHandler.js';

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = "https://nexus-ai-chatbotv2.onrender.com";
const JWT_SECRET = "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";

// Environment configs
process.env.JWT_SECRET = JWT_SECRET;
process.env.NODE_ENV = "production";
process.env.JWT_EXPIRES_IN = "7d";

// App init
const app = express();

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// CORS
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));
app.use(morgan('dev'));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API is working 🎉');
});

// Error handler
app.use(errorHandler);

// DB connect & server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Accepting requests from: ${FRONTEND_URL}`);
  });
}).catch((err) => {
  console.error("❌ DB connection failed:", err);
  process.exit(1);
});
