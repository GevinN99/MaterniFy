
// routes/healthPlan.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const HealthPlan = require('../models/HealthPlan');

// POST endpoint to receive a health report and generate a plan
router.post('/', async (req, res) => {
  try {
    // ============================================================
    // Hard-coded Data for Now
    // ============================================================
    // For now, we are using a hard-coded health report.
    // In production, you would retrieve the mother's data from the database.
    //
    // Example:
    // const userId = req.body.userId; // Authenticated user's ID from the request
    // const user = await User.findById(userId);
    // const report = {
    //   age: user.age,
    //   weight: user.weight,
    //   medicalHistory: user.medicalHistory,
    //   pregnancyStage: user.pregnancyStage,
    // };
    //
    // For now, use the following hard-coded data:
    const report = {
      age: 30,
      weight: 65,
      medicalHistory: "No significant issues",
      pregnancyStage: "Second Trimester"
    };

    // Hard-coded userId for demonstration purposes.
    // Replace with dynamic user data when available.
    const userId = "dummyUserId";

    // Build a prompt for the OpenAI API using the report details
    const prompt = `Generate a personalized health plan for a pregnant woman with the following details:
Age: ${report.age}
Weight: ${report.weight}
Medical History: ${report.medicalHistory}
Pregnancy Stage: ${report.pregnancyStage}
Provide recommendations for conditions like anemia, gestational diabetes, and high blood pressure.
Include daily reminders such as "Drink more water today to reduce swelling."`;

    // Call the OpenAI API to generate the health plan
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // or your chosen model
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const planText = openaiResponse.data.choices[0].message.content;

    // Define sample daily reminders; these could also be extracted from planText
    const reminders = [
      "Drink more water today to reduce swelling.",
      "Your iron levels are low; here’s a food guide."
    ];

    // Save the generated plan to the database
    const newHealthPlan = new HealthPlan({
      userId,
      report,
      plan: planText,
      reminders,
    });
    const savedPlan = await newHealthPlan.save();

    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error generating health plan:', error);
    res.status(500).json({ error: 'Error generating health plan' });
  }
});

module.exports = router;

