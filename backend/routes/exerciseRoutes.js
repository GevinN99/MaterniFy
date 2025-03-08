const express = require("express");
const { getExercisesByScore, addExercise } = require("../controllers/exerciseController");

const router = express.Router();

router.get("/:userId", getExercisesByScore);
router.post("/add", addExercise);

module.exports = router;
