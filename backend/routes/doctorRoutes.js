const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middlewares/auth');

// Public Routes
router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);

// Protected Routes
router.get('/profile', auth.authenticate, doctorController.getDoctorProfile);
router.put('/profile', auth.authenticate, doctorController.updateDoctorProfile);

module.exports = router;
