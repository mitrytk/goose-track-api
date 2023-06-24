const { registerSchema, loginShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");
const { statisticsSchema } = require("./statistics");

module.exports = {
  registerSchema,
  loginShema,
  addTaskSchema,
  updateTaskSchema,
  statisticsSchema,
};
