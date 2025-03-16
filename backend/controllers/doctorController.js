const Doctor = require('../models/doctorModel');
const {hashPassword, comparePassword, generateToken} = require('../middlewares/auth');

// Register a new doctor
exports.registerDoctor = async (req, res) => {
    try {
        const {fullName, email, password, experienceYears, specialization} = req.body;

        const existingDoctor = await Doctor.findOne({email});
        if (existingDoctor) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword = await hashPassword(password);

        const newDoctor = new Doctor({
            fullName,
            email,
            password: hashedPassword,
            experienceYears,
            specialization,
        });

        await newDoctor.save();
        res.status(201).json({message: 'Doctor registered successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

// Doctor login
exports.loginDoctor = async (req, res) => {
    try {
        const {email, password} = req.body;

        const doctor = await Doctor.findOne({email});
        if (!doctor) {
            return res.status(404).json({message: 'Doctor not found'});
        }

        const passwordMatch = await comparePassword(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = generateToken(doctor);
        res.status(200).json({token, doctorId: doctor._id, role: doctor.role});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

// Get doctor profile
exports.getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({message: 'Doctor not found'});
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

// Update doctor profile
exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const {fullName, experienceYears, specialization, profileImage, online} = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {fullName, experienceYears, specialization, profileImage, online},
            {new: true}
        );

        if (!updatedDoctor) {
            return res.status(404).json({message: 'Doctor not found'});
        }

        res.status(200).json({message: 'Doctor profile updated successfully', doctor: updatedDoctor});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

// Get available doctors
exports.getAvailableDoctors = async (req, res) => {
    try {
        // Fetch only doctors who are online or available for consultation
        const doctors = await Doctor.find({ online: true }); // Ensure you are filtering by the `online` field
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching available doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};