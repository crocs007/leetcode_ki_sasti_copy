const cppCompile = require("../languages/cpp/compile");
const cppExecute = require("../languages/cpp/execute");
const cppDriver =  require("../driver/cppDriver")

const pythonCompile = require("../languages/python/compile");
const pythonExecute = require("../languages/python/execute");
const pythonDriver =  require("../driver/pythonDriver")

const javaCompile = require("../languages/java/compile");
const javaExecute = require("../languages/java/execute");
const javaDriver =  require("../driver/javaDriver")

module.exports = {

    cpp: {

        extension: ".cpp",

        compile: cppCompile,

        execute: cppExecute,

        driver: cppDriver
        
    },
    
    python: {
        
        extension: ".py",
        
        compile: pythonCompile,
        
        execute: pythonExecute,
        
        driver: pythonDriver
    },
    
    java: {
        
        extension: ".java",
        
        compile: javaCompile,
        
        execute: javaExecute,
        
        driver: javaDriver,

        className: "Main"

    }

};