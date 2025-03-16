const EpdsResponse = require("../models/epdsTest/EpdsResponse");

// Save user EPDS response
exports.saveEpdsResponse = async (req, res) => {
    try {
        const { userId, responses, totalScore } = req.body;

        if (!userId || !responses || totalScore === undefined) {
            return res.status(400).json({ message: "Invalid data provided" });
        }

        const newResponse = new EpdsResponse({
            userId,
            responses,
            totalScore
        });

        await newResponse.save();
        res.status(201).json({ message: "Response saved successfully" });
    } catch (error) {
        console.error("Error saving EPDS response:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Fetch user responses
exports.fetchUserEpdsResponses = async (req, res) => {
    try {
        const { userId } = req.params;

        const responses = await EpdsResponse.find({ userId }).sort({ createdAt: -1 });

        if (!responses.length) {
            return res.status(404).json({ message: "No responses found for this user" });
        }

        res.status(200).json(responses);
    } catch (error) {
        console.error("Error fetching user EPDS responses:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
