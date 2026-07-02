const User = require("../models/users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        if (!firstName || !email || !password) {
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
            FullName: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userSafe = user.toObject();
        delete userSafe.password;

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: userSafe
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