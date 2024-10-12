import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that no two users have the same email
        match: /.+\@.+\..+/ // Basic regex for email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role options
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current date
    },
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set to the current date
    },
    attemptedQuizzes:
     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }] ,

    isActive: {
        type: Boolean,
        default: true // Indicates if the user account is active
    }
});

// Middleware to update the `updatedAt` field on every save
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Export the User model
export default mongoose.model('User', userSchema);



