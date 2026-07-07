const serializeInput = require("../utils/serializeInput");

function javaDriver(problem, userCode, testCase) {

    const args = serializeInput(
        testCase.input,
        "java"
    );

    return `
${userCode}

public class Main {

    public static void main(String[] args){

        Solution obj = new Solution();

        System.out.print(
            obj.${problem.functionName}(${args})
        );

    }

}
`;

}

module.exports = javaDriver;