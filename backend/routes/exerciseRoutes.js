import express from 'express';
import { getExercises, addExercise } from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', getExercises);
router.post('/add', addExercise);

export default router;