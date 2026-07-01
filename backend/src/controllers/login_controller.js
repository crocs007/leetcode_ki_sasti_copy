const User = require("../models/users_model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Error logging in"
        });
    }
};

module.exports = login;