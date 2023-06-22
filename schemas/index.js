const { addUserSchema } = require("./users");
const {addTaskSchema, updateTaskSchema} = require('./tasks')

module.exports = {
  addUserSchema,
  addTaskSchema,
  updateTaskSchema
};
