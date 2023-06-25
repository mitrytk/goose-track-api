const { registerSchema, loginShema, updateShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");

module.exports = {
  registerSchema,
  loginShema,
  updateShema,
  addTaskSchema,
  updateTaskSchema,
};
