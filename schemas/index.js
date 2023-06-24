const { registerSchema, loginShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");

module.exports = {
  registerSchema,
  loginShema,
  addTaskSchema,
  updateTaskSchema,
};
