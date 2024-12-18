const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    contactName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    type: { type: String, enum: ['hospital', 'ambulance', 'helpline'], required: true },
    region: { type: String, required: true },
    images: { type: [String], default: [] },
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
