const { exec } = require("child_process");

function execute(className, directory, input = "") {

    return new Promise((resolve, reject) => {

        const process = exec(
            `java -cp "${directory}" ${className}`,
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