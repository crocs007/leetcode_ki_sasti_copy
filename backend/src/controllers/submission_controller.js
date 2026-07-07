const Submission = require("../models/submission_model");
const Problem = require("../models/problem_model");
const judgeSubmission = require("../services/judge/judgeSubmission");

exports.submitCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const submission = await Submission.create({
      user: req.user._id,
      problem: problem._id,
      language,
      code,
    });

    const result = await judgeSubmission(
      language,
      code,
      problem
    );

    submission.verdict = result.verdict;
    submission.runtime = result.runtime;
    submission.memory = result.memory;
    submission.passedTestCases = result.passedTestCases;
    submission.totalTestCases = result.totalTestCases;

    await submission.save();

    return res.json({
      success: true,
      submissionId: submission._id,
      ...result,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};