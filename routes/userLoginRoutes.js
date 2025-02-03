const express = require('express');
const  userLogin  = require('../controllers/userLoginController');


const router = express.Router();


router.post('/', userLogin.login); //user login

// Protected route example
router.get('/homepage', (req, res) => {
  res.json({ message: 'Welcome to the customer service support' });
});

module.exports = router;
