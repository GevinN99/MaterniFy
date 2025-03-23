const axios = require('axios');
const Chat = require('../models/chat');

const sendMessageToChatGPT = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call OpenAI API
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message, type: "text" }]
        }),
        {
          headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

    const botReply = response.data.choices[0].message.content;

    // Save chat to MongoDB
    const chat = new Chat({ userId: userId, userMessage: message, botResponse: botReply });
    await chat.save();

    res.json({ userMessage: message, botResponse: botReply });

  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ userId }).sort({ timestamp: -1 });
    res.json(chats);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

module.exports = { sendMessageToChatGPT, getChatHistory };
