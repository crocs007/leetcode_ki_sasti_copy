const serializeInput = require("../utils/serializeInput");

function cppDriver(problem, userCode, testCase) {

    const args = serializeInput(
        testCase.input,
        "cpp"
    );

    return `
#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {

    Solution solution;

    cout << solution.${problem.functionName}(${args});

    return 0;
}
`;

}

module.exports = cppDriver;