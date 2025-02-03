const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const teamController = require('../controllers/teamController')

//unsecured routes
router.get('/', teamController.getTeams);
router.post('/', authenticate, teamController.createTeam);

//secured routes
router.delete('/:id',authenticate, authorize, teamController.deleteTeam);
router.put('/:id', authenticate, authorize,teamController.updateTeam);

module.exports = router;