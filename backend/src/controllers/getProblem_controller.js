const Problem = require("../models/problem_model");

// GET /api/auth/problems
const getAllProblems = async (req, res) => {
    try {
        // Only send the fields needed for a list view; hide hidden test cases
        const problems = await Problem.find().select(
            "title difficulty createdAt"
        );

        return res.status(200).json({
            success: true,
            count: problems.length,
            problems
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error fetching problems"
        });
    }
};

// GET /api/auth/problems/:id
const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;

        // Never send hiddenTestCases to the client
        const problem = await Problem.findById(id).select("-hiddenTestCases");

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        return res.status(200).json({
            success: true,
            problem
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error fetching problem"
        });
    }
};

module.exports = { getAllProblems, getProblemById };