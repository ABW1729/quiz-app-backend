import mongoose from 'mongoose';
import dotenv from 'dotenv';
const uri="mongodb+srv://aniketwani1729:8Z1lAn7547Wy2aL9@cluster0.4bwrce0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

dotenv.config();
export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};


