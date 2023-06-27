const { Task } = require("../models/task");
const { ctrlWrapper } = require("../helpers/index");

const getTasksStatisticsService = async (owner, dateString) => {
  const [year, month, day] = dateString.split("-");

  console.log(dateString.split("-"));

  const startDay = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    0,
    0,
    0
  );
  const endDay = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    23,
    59,
    59
  );

  const startMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
  const endMonth = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);

  const allTasksByMonth = await Task.find({
    owner,
    date: { $gte: startMonth, $lte: endMonth },
  });

  const allTasksByDay = await Task.find({
    owner,
    date: { $gte: startDay, $lte: endDay },
  });

  return { allTasksByDay, allTasksByMonth };
};

const getTasksStatistics = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const tasks = await getTasksStatisticsService(owner, date);
  const { allTasksByDay, allTasksByMonth } = tasks;

  const toDoByDay = allTasksByDay.filter((task) => task.category === "toDo");
  const inProgressByDay = allTasksByDay.filter(
    (task) => task.category === "inProgress"
  );
  const doneByDay = allTasksByDay.filter((task) => task.category === "done");

  const toDoByDayInPercent = toDoByDay.length / allTasksByDay.length;
  const inProgressByDayInPercent =
    inProgressByDay.length / allTasksByDay.length;
  const doneByDayInPercent = doneByDay.length / allTasksByDay.length;

  const toDoByMonth = allTasksByMonth.filter(
    (task) => task.category === "toDo"
  );
  const inProgressByMonth = allTasksByMonth.filter(
    (task) => task.category === "inProgress"
  );
  const doneByMonth = allTasksByMonth.filter(
    (task) => task.category === "done"
  );

  const toDoByMonthInPercent = toDoByMonth.length / allTasksByMonth.length;
  const inProgressByMonthInPercent =
    inProgressByMonth.length / allTasksByMonth.length;
  const doneByMonthInPercent = doneByMonth.length / allTasksByMonth.length;

  res.json({
    month: {
      tasksQuantity: allTasksByMonth.length,
      toDoByMonthInPercent,
      inProgressByMonthInPercent,
      doneByMonthInPercent,
    },
    day: {
      tasksQuantity: allTasksByDay.length,
      toDoByDayInPercent,
      inProgressByDayInPercent,
      doneByDayInPercent,
    },
  });
};

module.exports = { getTasksStatistics: ctrlWrapper(getTasksStatistics) };
