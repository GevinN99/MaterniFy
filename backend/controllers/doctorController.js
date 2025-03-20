const Doctor = require('../models/doctorModel');
const { hashPassword, comparePassword, generateToken } = require('../middlewares/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// Register a new doctor (Signup)
exports.registerDoctor = async (req, res) => {
    try {
        const { fullName, email, password, experienceYears, specialization, profileImage, online } = req.body;

        // Check if the doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        const newDoctor = new Doctor({
            fullName,
            email,
            password: hashedPassword, // Store the hashed password
            experienceYears,
            specialization,
            profileImage,
            online
        });

        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Log incoming request
        console.log("Login attempt with:", { email, password });

        // Find doctor by email
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            console.log("Doctor not found for email:", email);
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            console.log("Password mismatch for email:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: doctor._id, role: "doctor" },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            token,
            userId: doctor._id,
            message: "Doctor logged in successfully",
        });
    } catch (error) {
        console.error("Doctor Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get doctor profile
exports.getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update doctor profile
exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { fullName, experienceYears, specialization, profileImage, online } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { fullName, experienceYears, specialization, profileImage, online },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor profile updated successfully', doctor: updatedDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get available doctors
exports.getAvailableDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ online: true });
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching available doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};