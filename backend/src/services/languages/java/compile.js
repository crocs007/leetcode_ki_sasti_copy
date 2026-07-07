const { exec } = require("child_process");

function compile(sourceFile) {

    return new Promise((resolve, reject) => {

        exec(`javac "${sourceFile}"`, (err, stdout, stderr) => {

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