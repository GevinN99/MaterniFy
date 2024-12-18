const mongoose = require('mongoose');

const healthPlanSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    planName: {type: String, required: true},
    planDetails: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('HealthPlan', healthPlanSchema);
