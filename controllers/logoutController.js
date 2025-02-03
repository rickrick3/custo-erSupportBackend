const BlacklistedToken = require('libs/model/blackListedToken');

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // Set expiration based on token lifespan (example: 1 hour)
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Adjust based on JWT expiration time

        // Blacklist the token
        await BlacklistedToken.create({ token, expiresAt });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
