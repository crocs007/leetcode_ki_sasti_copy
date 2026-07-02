const Problem = require("../models/problem_models");

const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            inputFormat,
            outputFormat,
            constraints,
            examples,
            visibleTestCases,
            hiddenTestCases
        } = req.body;

        if (
            !title ||
            !description ||
            !difficulty ||
            !inputFormat ||
            !outputFormat ||
            !constraints ||
            !examples ||
            !visibleTestCases ||
            !hiddenTestCases
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            inputFormat,
            outputFormat,
            constraints,
            examples,
            visibleTestCases,
            hiddenTestCases
        });

        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error creating problem"
        });
    }
};

module.exports = createProblem;