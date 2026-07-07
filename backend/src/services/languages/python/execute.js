const { exec } = require("child_process");

function execute(sourceFile, input = "") {

    return new Promise((resolve, reject) => {

        const process = exec(
            `python "${sourceFile}"`,
            (err, stdout, stderr) => {

                if (err) {

                    return reject({
                        type: "Runtime Error",
                        error: stderr
                    });

                }

                resolve(stdout);

            }
        );

        process.stdin.write(input);
        process.stdin.end();

    });

}

module.exports = execute;