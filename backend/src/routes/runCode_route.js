const express = require("express");

const router = express.Router();

const { runCode } = require("../controllers/runCode_controller");

router.post("/", runCode);

module.exports = router;