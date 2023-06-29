const { Task } = require("../models/task");
const { ctrlWrapper } = require("../helpers/index");

const getTasksStatisticsService = async (owner, dateString) => {
  const startDay = new Date(dateString);
  const endDay = new Date(dateString);

  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(23, 59, 59, 999);

  const startMonth = new Date(dateString.substr(0, 7));
  const endMonth = new Date(dateString.substr(0, 7));
  endMonth.setMonth(endMonth.getMonth() + 1);
  endMonth.setDate(0);
  endMonth.setHours(23, 59, 59, 999);

  const formattedStartMonth = startMonth.toISOString().substring(0, 10);
  const formattedEndMonth = endMonth.toISOString().substring(0, 10);
  const formattedStartDay = startDay.toISOString().substring(0, 10);
  const formattedEndDay = endDay.toISOString().substring(0, 10);

  console.log(formattedEndMonth);

  const allTasksByMonth = await Task.find({
    owner,
    date: { $gte: formattedStartMonth, $lte: formattedEndMonth },
  });

  const allTasksByDay = await Task.find({
    owner,
    date: { $gte: formattedStartDay, $lte: formattedEndDay },
  });

  return { allTasksByDay, allTasksByMonth };
};

const getTasksStatistics = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const tasks = await getTasksStatisticsService(owner, date);
  const { allTasksByDay, allTasksByMonth } = tasks;

  const toDoByDay = allTasksByDay.filter((task) => task.category === "to-do");
  const inProgressByDay = allTasksByDay.filter(
    (task) => task.category === "in-progress"
  );
  const doneByDay = allTasksByDay.filter((task) => task.category === "done");

  const toDoByDayInPercent = toDoByDay.length / allTasksByDay.length;
  const inProgressByDayInPercent =
    inProgressByDay.length / allTasksByDay.length;
  const doneByDayInPercent = doneByDay.length / allTasksByDay.length;

  const toDoByMonth = allTasksByMonth.filter(
    (task) => task.category === "to-do"
  );
  const inProgressByMonth = allTasksByMonth.filter(
    (task) => task.category === "in-progress"
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
