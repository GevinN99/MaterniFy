const HealthPlan = require('../models/HealthPlanModel');

exports.createHealthPlan = async (req, res) => {
    try {
        const { planName, planDetails, images } = req.body;
        const userId = req.user.id;

        const newHealthPlan = new HealthPlan({
            userId,
            planName,
            planDetails,
            images,
        });

        await newHealthPlan.save();

        res.status(201).json({ message: 'Health plan created successfully', healthPlan: newHealthPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getHealthPlan = async (req, res) => {
    try {
        const userId = req.user.id;

        const healthPlan = await HealthPlan.findOne({ userId });

        if (!healthPlan) {
            return res.status(404).json({ message: 'No health plan found' });
        }

        res.status(200).json(healthPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateHealthPlanImages = async (req, res) => {
    try {
        const { images } = req.body;
        const userId = req.user.id;

        const updatedHealthPlan = await HealthPlan.findOneAndUpdate(
            { userId },
            { $set: { images } },
            { new: true }
        );

        if (!updatedHealthPlan) {
            return res.status(404).json({ message: 'Health plan not found' });
        }

        res.status(200).json({ message: 'Health plan images updated successfully', healthPlan: updatedHealthPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addImagesToHealthPlan = async (req, res) => {
    try {
        const { images } = req.body;
        const userId = req.user.id;

        const updatedHealthPlan = await HealthPlan.findOneAndUpdate(
            { userId },
            { $push: { images: { $each: images } } },
            { new: true }
        );

        if (!updatedHealthPlan) {
            return res.status(404).json({ message: 'Health plan not found' });
        }

        res.status(200).json({ message: 'Images added successfully', healthPlan: updatedHealthPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteHealthPlan = async (req, res) => {
    try {
        const userId = req.user.id;

        const healthPlan = await HealthPlan.findOneAndDelete({ userId });

        if (!healthPlan) {
            return res.status(404).json({ message: 'No health plan found' });
        }

        res.status(200).json({ message: 'Health plan deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
