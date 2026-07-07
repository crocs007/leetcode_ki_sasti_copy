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
    
    functionName: {
        type: String,
        required: true
    },
    
    returnType: {
        type: String,
        required: true
    },
    
    parameters: [
        {
            type: {
                type: String,
                required: true
            },
            
            name: {
                type: String,
                required: true
            }
        }
    ],
    
    starterCode: {
        cpp: {
            type: String,
            required: true
        },
        python: {
            type: String,
            required: true
        },
        java: {
            type: String,
            required: true
        }
    },
        
    examples: {
        type: [{
            input: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            output: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            explanation: {
                type: String
            }
        }],
        validate: {
            validator: arr => arr.length > 0,
            message: "At least one example is required."
        }
    },

    inputFormat: {
        type: String,
        required: [true, "Input format is required"]
    },

    outputFormat: {
        type: String,
        required: [true, "Output format is required"]
    },

    constraints: [
        {
            type: String,
            required: true
        }
    ],


    visibleTestCases: {
        type: [{
            input:{
                type: mongoose.Schema.Types.Mixed,
                required:true
            },
            output:{
                type: mongoose.Schema.Types.Mixed,
                required:true
            }
        }],
        validate: {
            validator: arr => arr.length > 0,
            message: "At least one visible test case is required."
        }
    },

    hiddenTestCases: {
        type: [{
            input: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            output: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }],
        validate: {
            validator: arr => arr.length > 0,
            message: "At least one hidden test case is required."
        }
    },

    timeLimit: {
        type: Number,
        default: 1000
    },  

    memoryLimit: {
        type: Number,
        default: 256
    },


    tags: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Problem", problemsSchema);