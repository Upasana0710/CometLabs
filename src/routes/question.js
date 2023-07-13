import express from 'express';
import { createQuestion } from '../controllers/question.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

router.post('/', [verifyToken, checkAdmin], createQuestion);

export default router;
