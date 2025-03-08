import EpdsResponse from "../../models/epdsTest/EpdsResponse.js";

// Save user EPDS response
export const saveEpdsResponse = async (req, res) => {
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch user responses
export const fetchUserEpdsResponses = async (req, res) => {
  try {
    const { userId } = req.params;
      const responses = await EpdsResponse.find({ userId }).sort({ createdAt: -1 });

      if (!responses.length) {
          return res.status(404).json({ message: "No responses found for this user" });
      }

      res.status(200).json(responses);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};