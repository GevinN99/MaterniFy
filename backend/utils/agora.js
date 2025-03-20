const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure dotenv is loaded

const { AgoraAppID, AgoraAppCertificate } = process.env;

// Generate a token for Agora Video Call
exports.generateAgoraToken = async (doctorId, userId) => {
    try {
        const expirationTime = 3600; // 1 hour expiration
        const channelName = `${doctorId}-${userId}`; // Unique channel name based on IDs

        const token = jwt.sign(
            {
                appId: AgoraAppID,
                channelName: channelName,
                userId: userId,
                role: "publisher",
                expireAt: Date.now() + expirationTime * 1000,
            },
            AgoraAppCertificate,
            { expiresIn: expirationTime }
        );

        return { token, channelName };
    } catch (error) {
        console.error("Error generating Agora token:", error);
        throw new Error(`Token generation failed: ${error.message}`);
    }
};