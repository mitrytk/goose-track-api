const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/tasks");

const {addTaskSchema, updateTaskSchema} = require('../../schemas');
const { volidateBody, authenticate } = require("../../middlewares/index");

const router = express.Router();

router.use(authenticate)

router.route('/').get(getTasks).post(volidateBody(addTaskSchema), createTask)

router
  .route(`/:taskId`)
  .get(getTask)
  .patch(volidateBody(updateTaskSchema), updateTask)
  .delete(deleteTask);

module.exports = router