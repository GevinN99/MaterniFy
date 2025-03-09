const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // You can hash this password as in the User model
    profileImage: { type: String, default: "https://www.w3schools.com/w3images/avatar2.png" },
    experienceYears: { type: Number, required: true },
    onlineAvailable: { type: Boolean, default: false },
    isConsultant: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
