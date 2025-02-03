const Admin = require('../libs/model/adminModel');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');
const bcrypt = require('bcrypt');

// Admin Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
      // Verify the password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      console.log(isMatch)
      // Generate a JWT token
      const token = jwt.sign({ id: admin._id, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
      res.json({ token });

      //test
      console.log(username, password)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  