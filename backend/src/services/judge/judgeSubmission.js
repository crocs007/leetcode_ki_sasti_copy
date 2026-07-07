const runCode = require("./runCode");
const compareOutput = require("./compareOutput");

async function judgeSubmission(language, code, problem) {
  const testCases = problem.hiddenTestCases || [];

  let passedTestCases = 0;

  for (const testCase of testCases) {
    const result = await runCode(
      language,
      code,
      problem,
      testCase.input
    );

    //temporary
    console.log("runCode result:", result);

    // Compilation Error / Runtime Error / etc.
    if (!result.success) {
      return {
        verdict: result.type || "Internal Error",
        runtime: null,
        memory: null,
        passedTestCases,
        totalTestCases: testCases.length,
      };
    }

    const accepted = compareOutput(
      testCase.output,
      result.output
    );

    if (!accepted) {
      return {
        verdict: "Wrong Answer",
        runtime: null,
        memory: null,
        passedTestCases,
        totalTestCases: testCases.length,
      };
    }

    passedTestCases++;
  }

  return {
    verdict: "Accepted",
    runtime: null,
    memory: null,
    passedTestCases,
    totalTestCases: testCases.length,
  };
}

module.exports = judgeSubmission;