const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const languages = require("../config/languages");

const tempDir = path.join(__dirname, "../../temp");

async function runCode(language, code, problem, customInput) {

    const config = languages[language];

    if (!config) {

        throw {

            type: "Language Error",
            error: "Unsupported language"

        };

    }

    const id = uuid();

    let sourceFile;
    let executableFile;
    
    try {
        
        if (language === "java") {
            
            sourceFile = path.join(tempDir, "Main.java");
            
        } else {
            
            sourceFile = path.join(
                tempDir,
                `${id}${config.extension}`
            );
            
        }
        
        const finalCode = config.driver
            ? config.driver(
                problem,
                code,
                {
                    input: customInput
                }
            )
            : code;

        fs.writeFileSync(
            sourceFile,
            finalCode
        );
        
        let output;

        if (language === "cpp") {
            executableFile = path.join(
                tempDir,
                process.platform === "win32"
                    ? `${id}.exe`
                    : id
            );

            await config.compile(sourceFile, executableFile);
            output = await config.execute(executableFile);
        }
        else if (language === "python") {
            await config.compile(sourceFile);
            output = await config.execute(sourceFile);
        }
        else if (language === "java") {
            await config.compile(sourceFile);
            output = await config.execute(config.className, tempDir);
        }

        return {
            success: true,
            output: output.trim()
        };

    } catch (err) {

        return {
            success: false,
            type: err.type || "Internal Error",
            error: err.error || err.message || "Unknown error"
        };
        
    } finally {

        if (sourceFile && fs.existsSync(sourceFile))
            fs.unlinkSync(sourceFile);

        if (executableFile && fs.existsSync(executableFile))
            fs.unlinkSync(executableFile);

        const files = fs.readdirSync(tempDir);

        for (const file of files) {
            if (file.endsWith(".class")) {
                fs.unlinkSync(path.join(tempDir, file));
            }   
        }

    }

}

module.exports = runCode;