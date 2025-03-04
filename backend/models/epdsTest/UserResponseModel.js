const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    selectedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

const UserResponse = mongoose.model('UserResponse', UserResponseSchema);
module.exports = UserResponse;