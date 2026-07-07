const { exec } = require("child_process");

function execute(executableFile, input = "") {

    return new Promise((resolve, reject) => {

        const process = exec(`"${executableFile}"`, (err, stdout, stderr) => {

            if (err) {

                return reject({
                    type: "Runtime Error",
                    error: stderr
                });

            }

            resolve(stdout);

        });

        process.stdin.write(input);
        process.stdin.end();

    });

}

module.exports = execute;