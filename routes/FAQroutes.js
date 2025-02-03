const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');

const FAQController = require('../controllers/FAQcontroller')

//unsecured routes
router.post('/',  FAQController.createFAQ);
router.get('/', authenticate, FAQController.getFAQs);

//secured routes
router.put('/:id', authenticate, authorize, FAQController.updateFAQ);
router.delete('/:id', authenticate, authorize, FAQController.deleteFAQ);

module.exports = router;