const express = require("express");

const router = express.Router();

const { submitCode } = require("../controllers/submission_controller");

const { authMiddleware } = require("../middlewares/auth_middleware");

router.post("/", authMiddleware, submitCode);

module.exports = router;