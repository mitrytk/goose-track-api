const { Task } = require("../models/task");
const { HttpError, ctrlWrapper } = require("../helpers/index");

const getTasks = async (req, res) => {
  const tasks = await Task.find();
// const { _id: owner } = req.user;    
  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }
  res.status(200).json(task);
};

const createTask = async (req, res) => {
//   const { _id: owner } = req.user;
    const newTask = await Task.create({
        ...req.body,
        // owner
    });

  res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndRemove(taskId);
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }

  res.status(200).json({ message: "Task removed" });
};

module.exports = {
  getTasks: ctrlWrapper(getTasks),
  getTask: ctrlWrapper(getTask),
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
