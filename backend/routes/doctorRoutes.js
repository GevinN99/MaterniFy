const express = require('express');
const { registerDoctor, loginDoctor, getDoctorProfile, updateDoctorProfile, getAvailableDoctors } = require('../controllers/doctorController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

// Public routes
router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

// Protected routes (require authentication)
router.get('/profile', authenticate, getDoctorProfile);
router.put('/profile', authenticate, updateDoctorProfile);
router.get('/available', getAvailableDoctors);

module.exports = router;