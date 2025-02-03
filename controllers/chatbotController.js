const axios = require("axios");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_NAME = process.env.MODEL_NAME || "mistralai/Mistral-7B-Instruct";  // Change model if needed

/**
 * Handle chatbot conversation using Hugging Face API
 */
exports.handleMessage = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Send request to Hugging Face API
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
            { inputs: message },
            { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
        );

        const botResponse = response.data[0]?.generated_text || "Sorry, I couldn't process that.";
        res.status(200).json({ response: botResponse });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Failed to process message" });
    }
};

/**
 * Check chatbot health status
 */
exports.getStatus = (req, res) => {
    res.status(200).json({ status: "Chatbot API is running" });
};
