const mongoose = require("mongoose");

const problemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Problem must have a title"],
        minlength: [3, "Title must be at least 3 characters long"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Problem must have a description"],
        minlength: [15, "Problem description should be detailed enough"]
    },

    difficulty: {
        type: String,
        required: [true, "Problem must have a difficulty"],
        enum: ["Easy", "Medium", "Hard"]
    },

    inputFormat: {
        type: String,
        required: [true, "Input format is required"]
    },

    outputFormat: {
        type: String,
        required: [true, "Output format is required"]
    },

    constraints: [{
        type: String
    }],

    //ask how to make this array required
    examples: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        explanation: {
            type: String
        }
    }],

    visibleTestCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }],

    hiddenTestCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Problem", problemsSchema);