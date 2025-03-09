const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    motherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentType: { type: String, enum: ['emergency', 'scheduled'], required: true },
    appointmentDate: { type: Date }, // Used for scheduled appointments
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    online: { type: Boolean, default: false }, // True if it's an online appointment (video)
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
