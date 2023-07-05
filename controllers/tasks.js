const { Task } = require("../models/task");
const { HttpError, ctrlWrapper } = require("../helpers");

const getTasks = async (req, res) => {
   const owner = req.user;
   const tasks = await Task.find({owner});
   res.status(200).json(tasks);
}

const getMonthTasks = async (req, res) => {
  const { year, month } = req.params;
  const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
  const endDate = `${year}-${month.toString().padStart(2, "0")}-${new Date(
    year,
    month,
    0
  ).getDate()}`;
  console.log(year, month)
  const owner = req.user;
  const tasks = await Task.find({date: { $gte: startDate, $lte: endDate },owner});
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
  getMonthTasks: ctrlWrapper(getMonthTasks),
  getTask: ctrlWrapper(getTask),
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
