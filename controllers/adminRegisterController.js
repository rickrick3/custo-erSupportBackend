const Admin = require('../libs/model/adminModel');
const bcrypt = require('bcrypt');

// Admin Registration
exports.register = async (req, res) => {
  const { username, password, email, role} = req.body;

  try {
    // Check if the username is already taken
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const admin = await Admin.create({ ...req.body, password: hashedPassword });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};