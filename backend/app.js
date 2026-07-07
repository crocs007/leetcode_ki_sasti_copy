const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth_route");
const problemRoutes = require("./src/routes/createProblem_route");
const runCodeRoute = require("./src/routes/runCode_route");
const submissionRoute = require("./src/routes/submission_route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/run", runCodeRoute);
app.use("/api/submissions", submissionRoute);

module.exports = app;