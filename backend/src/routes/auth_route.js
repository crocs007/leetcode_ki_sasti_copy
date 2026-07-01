const express = require("express");

const signup = require("../controllers/signup_controller");
const login = require("../controllers/login_controller");
const createProblem = require("../controllers/create_problem_controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post(
    "/create-problem",
    authMiddleware,
    roleMiddleware("admin"),
    createProblem
);

module.exports = router;