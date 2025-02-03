const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../libs/model/blackListedToken');
const { jwtSecret } = require('../config/jwtConfig');

// Authenticate Middleware
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authentication token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Check if token is blacklisted
        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) return res.status(403).json({ message: 'Token has been invalidated' });

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        console.log(decoded)
        next();

    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Authorize Middleware
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access is denied' });
        }

        next();
    };
};

module.exports = { authenticate, authorize };
