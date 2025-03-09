const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/auth');

// Create Appointment
router.post('/create', auth.authenticate, appointmentController.createAppointment);

// Get Available Doctors for online consultation
router.get('/available-doctors', auth.authenticate, appointmentController.getAvailableDoctors);

// Get all appointments for a mother
router.get('/appointments', auth.authenticate, appointmentController.getAppointments);

// Update Doctor availability (only accessible by the doctor)
router.put('/doctor/availability', auth.authenticate, appointmentController.updateDoctorAvailability);

module.exports = router;
