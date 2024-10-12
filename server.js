import express from 'express';
import bodyParser from 'body-parser';
import {connectDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import studentRoutes from './routes/studentRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/students', studentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

