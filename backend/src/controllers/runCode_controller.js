const runCodeService = require("../services/judge/runCode");
const Problem=require("../models/problem_model");

async function runCode(req, res) {
    try {
        const {
            language,
            code,
            problemId,
            input
        }=req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Code is required"
            });
        }

        const problem=await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        const output = await runCodeService(
            language,
            code,
            problem,
            input
        );
        
        res.json({
            success: true,
            output
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            ...err
        });

    }
}

module.exports = {
    runCode
};