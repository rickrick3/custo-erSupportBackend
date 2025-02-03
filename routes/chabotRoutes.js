const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/authMiddleware");
const chatbotController = require("../controllers/chatbotController")

router.post('/', chatbotController.handleMessage);  // Chat with AI
router.get('/', chatbotController.getStatus);


module.exports = router;
