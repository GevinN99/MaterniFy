const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'doctor'},
    experienceYears: {type: Number, required: true}, // Doctor's years of experience
    specialization: {type: String, required: true}, // Doctor's specialization
    profileImage: {type: String, default: 'https://www.w3schools.com/w3images/avatar2.png'},
    online: {type: Boolean, default: false}, // Whether doctor is online for consultation
    createdAt: {type: Date, default: Date.now},
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;