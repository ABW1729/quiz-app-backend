
# Quiz-App-Backend

This repository contains backend code for quiz application


## Available APIs

### User Authentication
- **POST** `/register` - Register a new user.
- **POST** `/login` - Authenticate a user.

### Admin APIs
- **POST** `/createQuiz` - Create a new quiz.
- **GET** `/getQuizzes` - Retrieve all quizzes.
- **GET** `/getQuizDetails` - Get details of a specific quiz.
- **PUT** `/updateQuestion` - Update a quiz question.
- **POST** `/addQuestion` - Add a new question to a quiz.
- **DELETE** `/deleteQuiz` - Remove a quiz.
- **DELETE** `/deleteQuestion` - Remove a question from a quiz.
- **GET** `/getQuestionsAndAnswers` - Fetch all questions and answers for a quiz.
- **GET** `/getAllResponses` - Get all responses for a quiz.

### Student APIs
- **POST** `/createStudent` - Register a new student.
- **GET** `/getStudentDetails` - Retrieve details of a specific student.
- **PUT** `/updateStudentDetails` - Update student information.
- **GET** `/viewStudentResponses` - View responses submitted by a student.
- **GET** `/viewStudentScore` - Retrieve the score of a student.
- **GET** `/viewAttemptedQuizzes` - List quizzes attempted by a student.
- **DELETE** `/deleteStudentRecord` - Remove a student's record.
- **POST** `/takeQuiz` - Submit answers for a quiz.

## Technologies Used
- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - Web framework for Node.js to simplify routing and middleware management.
- **Mongoose** - MongoDB ORM for modeling application data and managing interactions with the MongoDB database.




## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-app-backend
    

To run this project, you will need to add the following environment variables to your `.env` file:

- **`MONGODB_URI`**: The connection string for your MongoDB database.
- **`JWT_SECRET`**: A secret key used for signing JSON Web Tokens (JWT) to ensure secure authentication. 

### Generating a Random JWT Secret

 To generate a random JWT secret, you can use the following command in your terminal:

```bash
openssl rand -hex 32
```

## Deployment

To start the backend server run

```bash
  npm start
```



## Live Deployment

The live deployment of this application can be accessed at the following URL:

- **Live Application**: [http://13.127.93.7:5000](http://13.127.93.7:5000)

### API Endpoints

- **Authentication APIs**: [http://13.127.93.7:5000/api/auth/](http://13.127.93.7:5000/api/auth/)
- **Student APIs**: [http://13.127.93.7:5000/api/students/](http://13.127.93.7:5000/api/students/)
- **Admin APIs**: [http://13.127.93.7:5000/api/quizzes/](http://13.127.93.7:5000/api/quizzes/)



