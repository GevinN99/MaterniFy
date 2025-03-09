const mongoose = require("mongoose");

const availableSlotSchema = new mongoose.Schema({
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    isBooked: {type: Boolean, default: false}, // True if slot is booked
    bookedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // User ID who booked
    createdAt: {type: Date, default: Date.now}
});

const AvailableSlot = mongoose.model("AvailableSlot", availableSlotSchema);
module.exports = AvailableSlot;
