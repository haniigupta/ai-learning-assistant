import express from 'express';
import {
    getQuizzes,
    getQuizById,
    submitQuiz,
    getQuizResults,
    getAllQuizzes,
    deleteQuiz,
} from '../controllers/quizController.js';
import protect  from '../middleware/auth.js';
const router = express.Router();

router.use(protect);

router.get('/',protect, getAllQuizzes);
router.get('/document/:documentId', protect, getQuizzes);
router.get('/quiz/:id', protect, getQuizById);
router.post('/:id/submit', protect, submitQuiz);
router.get('/:id/results', protect, getQuizResults);
router.delete('/:id', protect, deleteQuiz);

export default router;