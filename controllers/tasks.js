const { Task } = require("../models/task");
const { HttpError, ctrlWrapper } = require("../helpers/index");

const getTasks = async (req, res) => {
  const owner = req.user._id;
  const tasks = await Task.find({owner});
  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const { taskId } = req.params;
  const owner = req.user._id;
  const task = await Task.findById(taskId, owner);
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }
  res.status(200).json(task);
};

const createTask = async (req, res) => {
  const owner = req.user._id;
    const newTask = await Task.create({
        ...req.body,
        owner
    });

  res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const owner = req.user._id;
  const task = await Task.findByIdAndUpdate(
    taskId,
    req.body,
    {
      new: true,
    },
    owner
  );
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const owner = req.user._id;
  const task = await Task.findByIdAndRemove(taskId, owner);
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }

  res.status(200).json(taskId);
};

module.exports = {
  getTasks: ctrlWrapper(getTasks),
  getTask: ctrlWrapper(getTask),
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
