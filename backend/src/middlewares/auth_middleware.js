const authMiddleware = (req, res, next) => {
    const userRole = req.user?.role || req.headers["x-user-role"];

    if (!userRole) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    req.user = req.user || {};
    req.user.role = userRole;
    next();
};

const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!req.user?.role || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };