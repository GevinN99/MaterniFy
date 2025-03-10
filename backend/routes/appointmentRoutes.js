const express = require("express");
const {authenticate} = require("../middlewares/auth");
const {
    createAppointment,
    getDoctorAppointments,
    cancelAppointment,
    getAvailableAppointments,
    bookAppointment,
    getUserBookedAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

// Doctor Routes
router.post("/create", authenticate, createAppointment);
router.get("/doctor", authenticate, getDoctorAppointments);
router.delete("/cancel/:appointmentId", authenticate, cancelAppointment);

// User Routes
router.get("/available", getAvailableAppointments);
router.post("/book", authenticate, bookAppointment);
router.get("/my-booked", authenticate, getUserBookedAppointments);

module.exports = router;
