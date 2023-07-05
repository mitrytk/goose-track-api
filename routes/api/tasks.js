const express = require("express");
const {
  getTasks,
  getMonthTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/tasks");

const { addTaskSchema, updateTaskSchema } = require("../../schemas");
const { volidateBody, authenticate, validateMonth} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getTasks);
router.get("/month/:year-:month", authenticate, validateMonth, getMonthTasks);
router.get("/:taskId", authenticate, getTask);
router.post("/", authenticate, volidateBody(addTaskSchema), createTask);
router.patch(
  "/:taskId",
  authenticate,
  volidateBody(updateTaskSchema),
  updateTask
);
router.delete("/:taskId", authenticate, deleteTask);

module.exports = router;
