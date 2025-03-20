const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected Routes
router.get('/profile', auth.authenticate, userController.getUserProfile);
router.put('/profile', auth.authenticate, userController.updateUserProfile);

// Admin or User Routes
router.get('/all-users', auth.authenticate, userController.getAllUsers);
router.delete('/:userId', auth.authenticate, userController.deleteUser);

module.exports = router;

