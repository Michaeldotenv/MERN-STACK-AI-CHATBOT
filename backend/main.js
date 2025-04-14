// src/app.js
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import userRoutes from './routes/userRoutes.js'; // Make sure this is the correct path
import chatRoutes from "./routes/chatRoutes.js"
import errorHandler from './middleware/errorHandler.js';
import path from "path"
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5174",
    "https://nexus-ai-chatbotv1.onrender.com"
  ], // allow your frontend URL
  credentials: true,
}));


// Serve static files from React
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing - return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// Logging (disable in production for performance)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.get('/', (req, res) => {
  res.send('API is working 🎉');
});
// Routes - Only user routes
app.use('/api/v1', userRoutes);
app.use('/api/chat', chatRoutes)


app.use(errorHandler);

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} and connected to database`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
