const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: Array, required: true }],
    correctAnswer: { type: String, required: true },
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;