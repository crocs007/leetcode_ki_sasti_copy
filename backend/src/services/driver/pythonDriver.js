const serializeInput = require("../utils/serializeInput");

function pythonDriver(problem, userCode, testCase) {

    const args = serializeInput(
        testCase.input,
        "python"
    );

    return `
${userCode}

obj = Solution()

print(obj.${problem.functionName}(${args}))
`;

}

module.exports = pythonDriver;