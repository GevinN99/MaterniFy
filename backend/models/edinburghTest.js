const mongoose = require('mongoose');

const edinburghTestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: { type: [Number], required: true },
    score: [{ type: Number, required: true }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EdinburghTest', edinburghTestSchema);
