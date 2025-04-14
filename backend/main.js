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

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5174",
    "https://nexus-ai-chatbotx.onrender.com"
  ], // allow your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
 
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