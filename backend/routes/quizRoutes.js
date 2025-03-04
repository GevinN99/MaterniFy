const express = require('express');
const { getQuizzes, submitAnswer, addQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/quizzes', getQuizzes);
router.post('/submit', submitAnswer);
router.post('/add', addQuiz);

module.exports = router;