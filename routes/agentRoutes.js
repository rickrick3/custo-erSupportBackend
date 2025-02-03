const agentController = require('../controllers/agentController');
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');

//unsecured routes
router.post('/',  agentController.createAgent);
router.get('/', agentController.getAgents);

//secured routes
router.put('/:id', authenticate, authorize, agentController.updateAgent);
router.delete('/:id', authenticate, authorize, agentController.deleteAgent);

module.exports = router;