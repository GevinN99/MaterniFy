const express = require('express');
const { saveEpdsResponse, fetchUserEpdsResponses } = require('../controllers/quizController');

const router = express.Router();

router.post('/submit-response', saveEpdsResponse);
router.get('/get-response/:userId', fetchUserEpdsResponses);

module.exports = router;