const jwt = require("jsonwebtoken");
const User = require("../models/users_model");

// Verifies the JWT sent in the Authorization header ("Bearer <token>"),
// attaches the logged-in user to req.user, and lets the request continue.
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided, please login"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

const roleMiddleware = (role) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};
module.exports = { authMiddleware, roleMiddleware };