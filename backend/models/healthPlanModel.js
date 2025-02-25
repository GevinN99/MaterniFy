const mongoose = require('mongoose');


const healthPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    planDetails: { type: String, required: true },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// models/HealthPlan.js
const mongoose = require('mongoose');

const HealthPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  report: {
    age: Number,
    weight: Number,
    medicalHistory: String,
    pregnancyStage: String,
    // Additional fields can be added here as needed.
  },
  plan: { 
    type: String, 
    required: true 
  }, // Full text of the generated health plan
  reminders: [String], // Daily reminders array
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('HealthPlan', HealthPlanSchema);


module.exports = mongoose.model('HealthPlan', healthPlanSchema);
