const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// Doctor creates an appointment
exports.createAppointment = async (req, res) => {
    try {
        const doctorId = req.user.id; // Get doctor ID from authenticated token

        const { appointmentType, appointmentDate, appointmentTime } = req.body;

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const newAppointment = new Appointment({
            doctorId: doctor._id,
            doctorName: doctor.fullName,
            specialization: doctor.specialization,
            appointmentType,
            appointmentDate,
            appointmentTime,
            status: "pending"
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Doctor fetches their appointments
exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;

        // Doctor fetches their own appointments
        const appointments = await Appointment.find({ doctorId })
            .populate("motherId", "fullName");

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Doctor cancels an appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const doctorId = req.user.id; // Get doctor ID from authenticated token
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

        // Ensure you filter for future appointments and only pending ones
        const appointments = await Appointment.find({
            status: { $in: ["pending", "any"] },
            appointmentDate: { $gte: currentDate }, // Filter out past appointments
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching available appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User books an appointment
exports.bookAppointment = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated token
        const { appointmentId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the appointment exists and is pending
        const appointment = await Appointment.findOne({ _id: appointmentId, status: "pending" });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found or already booked" });
        }

        // Assign the user to the appointment and update status
        appointment.motherId = user._id;
        appointment.motherName = user.fullName;
        appointment.status = "confirmed";

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

        // Find booked appointments for the user
        const appointments = await Appointment.find({ motherId: userId })
            .populate("doctorId", "fullName specialization profileImage");

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching user booked appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};