const express = require('express');
const  userRegister  = require('../controllers/userRegisterController');

const router = express.Router();


router.post('/', userRegister.register); //user register

// Protected route example
router.get('/user-register',(req, res) => {
    res.json({ message: 'Login' });
  });

module.exports = router;
