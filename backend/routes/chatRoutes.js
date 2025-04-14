import express from 'express';
import { sendMessage } from '../controllers/chatcontrollers.js';

const router = express.Router();

router.post('/', sendMessage);

export default router;
