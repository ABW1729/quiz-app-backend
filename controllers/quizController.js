import  {Quiz,Question,Response} from '../models/Quiz.js';


// Create Quiz
export const createQuiz = async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Quizzes
export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        if(quizzes.length===0){
            return res.status(200).json({message:"No quizzes found"})
        }
        
        return res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Quiz Details

export const getQuizDetails = async (req, res) => {
    try {
        // Find the quiz by its ID
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Find all questions associated with the given quiz ID
        const questions = await Question.find({ quizId: req.params.id });

        // Check if no questions have been added
        if (questions.length === 0) {
            return res.status(200).json({ 
                quiz, 
                message: 'No questions added for this quiz' 
            });
        }

        // Return both quiz details and its associated questions
        res.status(200).json({ 
            quiz, 
            questions 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const addQuestion = async (req, res) => {
    const { quizId, questionData } = req.body; // questionData should include the question and its correct answer
    try {
        const question = new Question({ quizId, ...questionData });
        await question.save();

        await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

        res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Optionally delete associated questions and responses
        await Question.deleteMany({ quizId: req.params.id });
        await Response.deleteMany({ quizId: req.params.id });

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Delete associated answers if applicable (if you have an answer model)
        await Response.deleteMany({ questionId: req.params.id });

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update Question
export const updateQuestion = async (req, res) => {
    const questionId = req.params.id; // Get the question ID from the URL parameters
    const updateData = req.body; // Expecting the updated data in the request body

    try {
        // Find the question by ID and update it
        const question = await Question.findByIdAndUpdate(questionId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the updated data against the schema
        });

        // Check if the question was found and updated
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question updated successfully', question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getQuestionsAndAnswers = async (req, res) => {
    try {
        // Find the quiz by its ID
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Find the questions associated with this quiz ID
        const questions = await Question.find({ quizId: req.params.id });

        if (questions.length === 0) {
            return res.status(200).json({ 
                quizId: quiz._id, 
                title: quiz.title, 
                message: 'No questions added' 
            });
        }

        // Map the questions to a suitable response format
        const questionsWithAnswers = questions.map((question) => ({
            question: question.question,
            options: question.options,
            correctAnswer: question.answer, // The actual answer text or index
        }));

        // Return the quiz details along with the questions
        res.status(200).json({
            quizId: quiz._id,
            title: quiz.title,
            questions: questionsWithAnswers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllResponses = async (req, res) => {
    try {
        const responses = await Response.find({ quizId: req.params.id }).populate('studentId','name email');
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
