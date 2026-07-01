const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FullName: {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String
        }
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must contain at least 8 characters"],
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    solvedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    }]

});

module.exports = mongoose.model("User", userSchema);