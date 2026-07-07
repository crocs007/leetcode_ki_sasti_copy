const { exec } = require("child_process");

function compile(sourceFile, executableFile) {
    return new Promise((resolve, reject) => {

        exec(`g++ "${sourceFile}" -o "${executableFile}"`, (err, stdout, stderr) => {

            if (err) {
                return reject({
                    type: "Compilation Error",
                    error: stderr
                });
            }

            resolve();

        });

    });
}

module.exports = compile;