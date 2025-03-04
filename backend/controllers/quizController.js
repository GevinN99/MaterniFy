const Quiz = require('../models/epdsTest/QuizModel');
const UserResponse = require('../models/epdsTest/UserResponseModel');

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};

const submitAnswer = async (req, res) => {
    try {
        const { userId, quizId, selectedAnswer } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const isCorrect = quiz.correctAnswer === selectedAnswer;

    const response = new UserResponse({
      userId,
      quizId,
      selectedAnswer,
      isCorrect,
    });

    await response.save();
    res.status(200).json({ message: "Answer submitted", isCorrect });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit answer" });
  }
};

// Add a new quiz question
const addQuiz = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const quiz = new Quiz({ question, options, correctAnswer });
    await quiz.save();
    res.status(201).json({ message: "Quiz added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add quiz" });
  }
};

module.exports = { getQuizzes, submitAnswer, addQuiz };