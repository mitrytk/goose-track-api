const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/tasks");

const { addTaskSchema, updateTaskSchema } = require("../../schemas");
const { volidateBody, authenticate } = require("../../middlewares/index");

const router = express.Router();

router.get("/", authenticate, getTasks);
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
