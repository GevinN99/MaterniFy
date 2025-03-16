const express = require("express");
const {
    createAppointment,
    getDoctorAppointments,
    cancelAppointment,
    getAvailableAppointments,
    bookAppointment,
    getUserBookedAppointments,
} = require("../controllers/appointmentController");
const auth = require('../middlewares/auth');

const router = express.Router();
// Doctor Routes
router.post("/create", auth.authenticate, createAppointment);
router.get("/doctor", auth.authenticate, getDoctorAppointments); // Doctor-specific appointments
router.delete("/cancel/:appointmentId", auth.authenticate, cancelAppointment);

// User Routes
router.get("/available", getAvailableAppointments); // Available appointments
router.post("/book", auth.authenticate, bookAppointment);
router.get("/my-booked", auth.authenticate, getUserBookedAppointments); // User's booked appointments

module.exports = router;