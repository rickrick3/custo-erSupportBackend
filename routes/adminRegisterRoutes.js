const express = require('express');
const adminRegister  = require('../controllers/adminRegisterController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', adminRegister.register) //admin registration


// Protected route example
router.get('/login', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Login' });
});

module.exports = router;
