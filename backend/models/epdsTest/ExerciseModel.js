import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: [ "text", "audio", "video" ], required: true },
    content: { type: String, required: true },
    category: { type: String, enum: [ "mild", "moderate", "severe" ], required: true },
    createdAt: { type: Date, default: Date.now }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export default Exercise;