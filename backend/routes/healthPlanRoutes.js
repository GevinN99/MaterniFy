const express = require('express');
const router = express.Router();
const healthPlanController = require('../controllers/healthPlanController');
const auth = require('../middlewares/auth');

router.post('/create', auth.authenticate, healthPlanController.createHealthPlan);
router.get('/', auth.authenticate, healthPlanController.getHealthPlan);
router.put('/update-images', auth.authenticate, healthPlanController.updateHealthPlanImages);
router.put('/add-images', auth.authenticate, healthPlanController.addImagesToHealthPlan);
router.delete('/delete-images', auth.authenticate, healthPlanController.deleteHealthPlan);

module.exports = router;
