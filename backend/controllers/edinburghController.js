const EdinburghTest = require('../models/edinburghTest');

exports.submitTest = (req, res) => {
    try {
        const { answers } = req.body;
        const score = answers.reduce((sum, val) => sum + val, 0);
        const test = new EdinburghTest({ userId, answers, score });
        test.save();
        res.status(201).send({ message: 'Test submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.getTestResults = async (req, res) => {
    try {
        const results = await EdinburghTest.find({ userId: req.user.id });
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};