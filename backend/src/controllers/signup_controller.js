const User = require("../models/users_model");
const bcrypt = require("bcrypt");

const auth = async (req, res) => {
    try {
        const { FullName, email, password, role } = req.body;

        if (!FullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists, try login"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            FullName,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Error creating account"
        });
    }
};

module.exports = auth;