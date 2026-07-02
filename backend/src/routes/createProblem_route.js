const express = require("express");

const createProblem = require("../controllers/createProblem_controller");
const { getAllProblems, getProblemById } = require("../controllers/getProblem_controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post(
    "/create-problem",
    authMiddleware,
    roleMiddleware("admin"),
    createProblem
);

router.get("/", authMiddleware, getAllProblems);
router.get("/:id", authMiddleware, getProblemById);

module.exports = router;