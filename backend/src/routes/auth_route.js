const express = require("express");

const signup = require("../controllers/signup_controller");
const login = require("../controllers/login_controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;