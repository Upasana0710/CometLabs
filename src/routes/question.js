import express from 'express';
import { createQuestion, updateQuestion } from '../controllers/question.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

router.post('/', [verifyToken, checkAdmin], createQuestion);
router.patch('/:id', [verifyToken, checkAdmin], updateQuestion);

export default router;
