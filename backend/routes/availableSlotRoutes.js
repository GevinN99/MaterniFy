const express = require('express');
const router = express.Router();
const availableSlotController = require('../controllers/availableSlotController');
const auth = require('../middlewares/auth');

// Doctor Routes
router.post('/create', auth.authenticate, availableSlotController.createAvailableSlot); // Create a new slot
router.get('/available/:doctorId', auth.authenticate, availableSlotController.getAvailableSlots); // Get available slots for a specific doctor
router.post('/book', auth.authenticate, availableSlotController.bookSlot); // Book an available slot
router.get('/booked/:doctorId', auth.authenticate, availableSlotController.getBookedSlots); // Get booked slots for a specific doctor

module.exports = router;
