const express = require('express');
const  adminlogin  = require('../controllers/adminLoginController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', adminlogin.login); //admin login

// Protected route example
router.get('/dashboard', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
