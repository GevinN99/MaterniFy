const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyContactController');
const auth = require('../middlewares/auth');

router.post('/add', auth.authenticate, emergencyContactController.addEmergencyContact);
router.get('/', auth.authenticate, emergencyContactController.getEmergencyContacts);
router.put('/:contactId/update-images', auth.authenticate, emergencyContactController.updateEmergencyContactImages);
router.delete('/:contactId', auth.authenticate, emergencyContactController.deleteEmergencyContact);

module.exports = router;
