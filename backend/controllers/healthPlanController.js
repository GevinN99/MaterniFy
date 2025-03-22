const HealthPlan = require('../models/HealthPlanModel');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

exports.generateHealthPlan = async (req, res) => {
    try {
        const userId = req.user.id;
        const { age, weight, medicalHistory, pregnancyStage } = req.body;

        if (!age || !weight || !medicalHistory || !pregnancyStage) {
            return res.status(400).json({ message: 'Missing required health data' });
        }

       // OpenAI ChatGPT API request
       const apiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4-turbo", // OpenAI model
            messages: [
                {
                    role: "user",
                    content: `Provide a structured pregnancy health plan for a ${age}-year-old, weighing ${weight}kg, with medical history: ${medicalHistory}, at the ${pregnancyStage}. Format the response as JSON.`
                }
            ],
            max_tokens: 1024
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // OpenAI API Key from .env
                'Content-Type': 'application/json'
            }
        }
    );

        // Extract AI-generated plan correctly
        const aiGeneratedPlan = apiResponse.data.content;

        // Save in MongoDB
        const newHealthPlan = new HealthPlan({
            userId,
            age,
            weight,
            medicalHistory,
            pregnancyStage,
            planDetails: aiGeneratedPlan
        });

        await newHealthPlan.save();

        res.status(201).json({ message: 'Custom health plan generated', healthPlan: newHealthPlan });
    } catch (error) {
        console.error('Error generating health plan:', error.response ? error.response.data : error);
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
