const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

// Create Appointment
exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentType, appointmentDate, online } = req.body;
        const motherId = req.user.id;  // Assuming user is authenticated and userId is available

        const appointment = new Appointment({
            motherId,
            doctorId,
            appointmentType,
            appointmentDate,
            online
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Available Doctors
exports.getAvailableDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ onlineAvailable: true }).sort({ experienceYears: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
};

// Get all appointments for a mother
exports.getAppointments = async (req, res) => {
    try {
        const motherId = req.user.id;  // Assuming user is authenticated
        const appointments = await Appointment.find({ motherId }).populate('doctorId', 'fullName');
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};

// Update Doctor availability for online consultation
exports.updateDoctorAvailability = async (req, res) => {
    try {
        const doctorId = req.user.id;  // Assuming doctor is authenticated
        const { onlineAvailable } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.onlineAvailable = onlineAvailable;
        await doctor.save();

        res.status(200).json({ message: 'Doctor availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating availability' });
    }
};
