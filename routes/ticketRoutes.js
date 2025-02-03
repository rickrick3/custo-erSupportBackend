const ticketController = require('../controllers/ticketController')
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');

//unsecured routes
router.post('/', ticketController.createTicket)
router.get('/', authenticate, authorize, ticketController.getTickets )

//secured routes
router.put('/:id',authenticate, authorize, ticketController.updateTicket)
router.delete('/:id', authenticate, authorize, ticketController.deleteTicket)

module.exports = router;