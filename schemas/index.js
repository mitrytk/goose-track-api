const { registerSchema, loginShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");
const { reviewSchema } = require("./reviews");

module.exports = {
  registerSchema,
  loginShema,
  addTaskSchema,
  updateTaskSchema,
  reviewSchema,
};
