const express = require('express');
const { submitTest, getTestResults } = require('../controllers/edinburghController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/submit', auth.authenticate, submitTest);
router.get('/results', auth.authenticate, getTestResults);

module.exports = router;