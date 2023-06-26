const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const taskRouter = require("./routes/api/tasks.js");
const authRouter = require("./routes/api/auth.js");
const reviewRouter = require("./routes/api/reviews.js");
const statisticsRouter = require("./routes/api/statistics.js");


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/statistics", statisticsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
