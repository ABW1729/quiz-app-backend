import mongoose from 'mongoose';


// Quiz Schema
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Quiz title
    description: { type: String }, // Quiz description
    maxScore:{type:Number,required:true},
    createdAt: { type: Date, default: Date.now }, // Date the quiz was created
});

// Question Schema
const questionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Foreign key to quizzes table
    question: { type: String, required: true },
    answer:{type:String,required:true},
    options:{type:[String],required:true},
    points:{type:Number,required:true},
    createdAt: { type: Date, default: Date.now }, // Date the question was created
});



// Student Response Schema
const responseSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        response: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
    }],
    createdAt: { type: Date, default: Date.now },
});

const scoreSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true }, // Total score for the quiz attempt
    created_at: { type: Date, default: Date.now },
});

// Create Models
export const Quiz = mongoose.model('Quiz', quizSchema);
export const Question = mongoose.model('Question', questionSchema);
export const Response = mongoose.model('Response', responseSchema);
export const Score=mongoose.model('Score',scoreSchema);


