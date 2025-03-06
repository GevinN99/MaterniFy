import Exercise from "../models/epdsTest/ExerciseModel";

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch exercises" });
    }
};

export const addExercise = async (req, res) => {
    const { title, description, type, content } = req.body;

    try{
        const newExercise = new Exercise({ title, description, type, content });
        await newExercise.save();
        res.status(201).json({ message: "Exercise added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add exercise" });
    }
};
