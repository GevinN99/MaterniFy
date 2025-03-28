const express = require('express');
const {
    createAppointment,
    getDoctorAppointments,
    cancelAppointment,
    getAvailableAppointments,
    bookAppointment,
    getUserBookedAppointments
} = require('../controllers/appointmentController');
const {authenticate} = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticate, createAppointment); // Doctor creates appointment
router.get('/doctor', authenticate, getDoctorAppointments); // Doctor views their appointments
router.delete('/cancel/:appointmentId', authenticate, cancelAppointment); // Cancel appointment (used by both doctor and mother)
router.get('/available', authenticate, getAvailableAppointments); // Mother views available appointments
router.post('/book', authenticate, bookAppointment); // Mother books appointment
router.get('/my-booked', authenticate, getUserBookedAppointments); // Mother views booked appointments

module.exports = router;