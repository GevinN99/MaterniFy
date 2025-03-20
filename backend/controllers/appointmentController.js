const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const { generateAgoraToken } = require('../utils/agora');

exports.createAppointment = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { appointmentType, appointmentDate, appointmentTime } = req.body;

        // Validation
        if (!appointmentType || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ message: "All fields (appointmentType, appointmentDate, appointmentTime) are required" });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Parse appointmentDate to ensure it’s a valid Date object
        const parsedDate = new Date(appointmentDate);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid appointmentDate format. Use YYYY-MM-DD" });
        }

        const newAppointment = new Appointment({
            doctorId: doctor._id,
            appointmentType,
            appointmentDate: parsedDate,
            appointmentTime,
            status: "pending",
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Doctor fetches their appointments
exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const appointments = await Appointment.find({ doctorId })
            .populate("motherId", "fullName");

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Doctor cancels an appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { appointmentId } = req.params;

        const appointment = await Appointment.findOne({ _id: appointmentId, doctorId });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found or not authorized to cancel" });
        }

        await Appointment.findByIdAndDelete(appointmentId);
        res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User fetches available appointments
exports.getAvailableAppointments = async (req, res) => {
    try {
        const currentDate = new Date();

        const appointments = await Appointment.find({
            status: { $in: ["pending", "any"] },
            appointmentDate: { $gte: currentDate },
        }).populate("doctorId", "fullName specialization");

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching available appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User books an appointment (Generate Agora token here)
exports.bookAppointment = async (req, res) => {
    try {
        const userId = req.user.id; // Mother ID from authenticated token
        const { appointmentId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const appointment = await Appointment.findOne({ _id: appointmentId, status: "pending" });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found or already booked" });
        }

        // Generate Agora token and channel name
        const { token, channelName } = await generateAgoraToken(appointment.doctorId, userId);

        // Update appointment with user details and Agora info
        appointment.motherId = user._id;
        appointment.status = "confirmed";
        appointment.agoraToken = token;
        appointment.channelName = channelName;

        await appointment.save();

        res.status(200).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User fetches their booked appointments
exports.getUserBookedAppointments = async (req, res) => {
    try {
        const userId = req.user.id;

        const appointments = await Appointment.find({ motherId: userId })
            .populate("doctorId", "fullName specialization profileImage");

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching user booked appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};