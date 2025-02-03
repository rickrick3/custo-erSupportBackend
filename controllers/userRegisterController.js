const User = require('../libs/model/userModel');
const bcrypt = require('bcrypt');

// User Registration
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const user = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};