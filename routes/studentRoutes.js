import express from 'express';
import  {
    createStudent,
    getStudentDetails,
    updateStudentDetails,
    viewStudentResponses,
    viewStudentScore,
    viewAttemptedQuizzes,
    deleteStudentRecord,
    takeQuiz,
} from '../controllers/studentController.js'; // Adjust the path as necessary

const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';
import  isAdmin from '../middleware/admin.middleware.js'; // Assuming you want to restrict some routes to admin users

router.use(authMiddleware);
// Route for creating a new student
router.post('/', createStudent);

// Route for getting student details by ID
router.get('/:id', getStudentDetails);

// Route for updating student details by ID
router.put('/:id',updateStudentDetails);

// Route for viewing responses of a student for a specific quiz
router.get('/:studentId/responses/:quizId', viewStudentResponses);

// Route for viewing a student's score for a specific quiz
router.get('/:studentId/score/:quizId', viewStudentScore);

// Route for viewing all attempted quizzes of a student
router.get('/:studentId/quizzes', viewAttemptedQuizzes);

// Route for deleting a student record by ID
router.delete('/:id', isAdmin, deleteStudentRecord);

// Route for taking a quiz
router.post('/:id/take', takeQuiz);

export default router;
