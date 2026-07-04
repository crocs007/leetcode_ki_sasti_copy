const Problem = require("../models/problem_models");

const deleteProblem = async (req, res) => {
    try {

        const { id } = req.params;

        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        await Problem.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully"
        });

    } catch (err) {

    console.log(err);

    return res.status(500).json({
        success: false,
        message: "Not able to perform the task"
    });

}
};

module.exports = deleteProblem;