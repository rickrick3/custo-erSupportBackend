const User = require('../libs/model/userModel');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');
const bcrypt = require('bcrypt');

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        console.log(isMatch)
        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: 'Customer' }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
} catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
