const express = require("express");
const deleteProblem = require("../controllers/deleteProblem_controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth_middleware");

const router = express.Router();

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteProblem
);

module.exports = router;