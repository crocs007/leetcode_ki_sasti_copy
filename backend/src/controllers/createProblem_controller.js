const Problem = require("../models/problem_model");

const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,

            functionName,
            returnType,
            parameters,
            starterCode,

            inputFormat,
            outputFormat,
            constraints,
            examples,

            visibleTestCases,
            hiddenTestCases,

            timeLimit,
            memoryLimit,
            tags
        } = req.body;

        if (
            !title ||
            !description ||
            !difficulty ||
            !functionName ||
            !returnType ||
            !Array.isArray(parameters) || parameters.length === 0 ||
            !starterCode ||
            !inputFormat ||
            !outputFormat ||
            !constraints ||
            !Array.isArray(examples) || examples.length === 0 ||
            !Array.isArray(visibleTestCases) || visibleTestCases.length === 0 ||
            !Array.isArray(hiddenTestCases) || hiddenTestCases.length === 0 ||
            !timeLimit ||
            !memoryLimit
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are missing"
            });
        }

        const problem = await Problem.create({
            title,
            description,
            difficulty,

            functionName,
            returnType,
            parameters,
            starterCode,

            inputFormat,
            outputFormat,
            constraints,
            examples,

            visibleTestCases,
            hiddenTestCases,

            timeLimit,
            memoryLimit,
            tags: tags || []
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