import {Quiz,Question,Response,Score} from '../models/Quiz.js';
import User from '../models/User.js';



// Create Student
export const createStudent = async (req, res) => {
    const studentData = req.body; // Expecting the student data in the request body

    try {
        // Check if a student with the same email already exists
        const existingStudent = await User.findOne({ email: studentData.email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }

        // If no existing student, create a new one
        const student = new User(studentData);
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Student Details
export const getStudentDetails = async (req, res) => {
    try {
        const student = await User.findById(req.params.id); // Finding student by ID from the URL parameters
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Student Details
export const updateStudentDetails = async (req, res) => {
    const studentId = req.params.id;
    const updateData = req.body; // Expecting the updated data in the request body

    try {
        const student = await User.findByIdAndUpdate(studentId, updateData, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student details updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Existing APIs...
export const viewStudentResponses = async (req, res) => {
    try {
        const responses = await Response.find({ quizId: req.params.quizId, studentId: req.params.studentId });
        if (!responses.length) {
            return res.status(404).json({ message: 'No responses found for this student' });
        }
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewStudentScore = async (req, res) => {
    try {
        const score = await Score.findOne({ quizId: req.params.quizId, studentId: req.params.studentId });
        if (!score) {
            return res.status(404).json({ message: 'No score found for this student' });
        }
        res.status(200).json({ score: score.value }); // Assuming the score is stored in a field named 'value'
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewAttemptedQuizzes = async (req, res) => {
    try {
        // Get the student ID from the request parameters
        const studentId = req.params.studentId;

        // Find the user to get attempted quiz IDs
        const user = await User.findById(studentId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Student not found' });
        }
       
        // If the user has no attempted quizzes
        if (user.attemptedQuizzes.length === 0) {
            return res.status(200).json({ message: 'No quizzes attempted' });
        }

        // Find all quizzes by their IDs
        const quizzes = await Quiz.find({ _id: { $in: user.attemptedQuizzes } });

        // Get the responses for each attempted quiz
        const responses = await Response.find({ studentId: studentId });

        // Combine quiz details with responses
        const quizResults = quizzes.map((quiz) => {
            const response = responses.find((resp) => resp.quizId.toString() === quiz._id.toString());
            return {
                quizId: quiz._id,
                title: quiz.title,
                description: quiz.description,
                score: response ? response.score : null, // Include score if available
                submitted: response ? response.submitted : false, // Include submission status
                createdAt: quiz.createdAt,
            };
        });

        res.status(200).json(quizResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Student Record
export const deleteStudentRecord = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Optionally delete responses associated with the student
        await Response.deleteMany({ studentId: req.params.id });

        res.status(200).json({ message: 'Student record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const takeQuiz = async (req, res) => {
    const { studentId, answers } = req.body; // Expecting an array of objects with questionId and chosenAnswer
    const quiz = await Quiz.findById(req.params.id); // Populate questions
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if the user has already submitted this quiz
    const existingResponse = await Response.findOne({ quizId: quiz._id, studentId: studentId });
    if (existingResponse) {
        return res.status(400).json({ message: 'You have already submitted this quiz.' });
    }

    let totalScore = 0; // Initialize total score
    let correctAnswersCount = 0; // Initialize correct answers count
    const responseArray = []; // Array to store individual responses

    // Loop through the answers provided by the student
    for (const answer of answers) {
        const { questionId, chosenAnswer } = answer; // Destructure to get questionId and chosenAnswer

        // Fetch the question for comparison
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(400).json({ message: `Question with ID ${questionId} not found.` });
        }

        // Check if the student's answer is correct
        const isCorrect = question.answer === chosenAnswer;
        if (isCorrect) {
            totalScore += question.points; // Add the question's score to total score
            correctAnswersCount++; // Increment correct answer count
        }

        // Push the response to the array
        responseArray.push({
            questionId: questionId,
            response: chosenAnswer,
            isCorrect: isCorrect,
        });
    }

    // Save the response
    const response = new Response({
        quizId: quiz._id,
        studentId: studentId,
        responses: responseArray, // Store the array of responses
    });

    await response.save();

    // Save the score to the Score table
    const score = new Score({
        quizId: quiz._id,
        studentId: studentId,
        score: totalScore,
    });

    await score.save();

    // Update the attempted quizzes for the student
    await User.findByIdAndUpdate(
        studentId,
        { $addToSet: { attemptedQuizzes: quiz._id } }, // Use $addToSet to avoid duplicates
        { new: true } // Return the updated document
    );

    res.status(200).json({ score: totalScore, correctAnswersCount: correctAnswersCount });
};