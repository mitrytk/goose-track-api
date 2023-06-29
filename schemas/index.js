const { registerSchema, loginShema, updateShema, changePasswordShema } = require("./users");
const { addTaskSchema, updateTaskSchema } = require("./tasks");
const { reviewSchema } = require("./reviews");
const { statisticsSchema } = require("./statistics");

module.exports = {
  registerSchema,
  loginShema,
  updateShema,
  addTaskSchema,
  updateTaskSchema,
  reviewSchema,
  statisticsSchema,
  changePasswordShema,
};
