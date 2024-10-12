import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import isAdmin from '../middleware/admin.middleware.js'; // Adjust the path to your middleware
import {
    createQuiz,
    getQuizzes,
    getQuizDetails,
    updateQuestion,
    addQuestion,
    deleteQuiz,
    deleteQuestion,
    getQuestionsAndAnswers,
    getAllResponses,
} from '../controllers/quizController.js';

const router = express.Router();

// Apply isAdmin middleware to all routes

router.use(authMiddleware,isAdmin);
// Route for creating a new quiz
router.post('/', createQuiz);

// Route for getting all quizzes
router.get('/', getQuizzes);

// Route for getting a quiz's details by ID
router.get('/:id', getQuizDetails);

router.put('/:id', updateQuestion); // Only admins can update questions


// Route for adding a question to a quiz
router.post('/question', addQuestion); // Expecting quizId in the request body

// Route for deleting a quiz by ID
router.delete('/:id', deleteQuiz);

// Route for deleting a question by ID
router.delete('/question/:id', deleteQuestion); // Expecting question ID in the URL

// Route for getting questions and answers of a quiz by ID
router.get('/:id/questions', getQuestionsAndAnswers);

// Route for getting all responses for a quiz by ID
router.get('/:id/responses', getAllResponses);

export default router;
