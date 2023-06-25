const { registerSchema, loginShema, updateShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");
const { statisticsSchema } = require("./statistics");

module.exports = {
  registerSchema,
  loginShema,
  updateShema,
  addTaskSchema,
  updateTaskSchema,
  statisticsSchema,
};
