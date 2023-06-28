const Joi = require("joi");

const timePattern = /^([0-9]{2}):([0-9]{2})$/;
const datePattern = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

const addTaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().regex(timePattern),
  end: Joi.string().regex(timePattern),
  priority: Joi.string().valid(...["low", "medium", "high"]),
  date: Joi.string()
    .regex(datePattern)
    .message("Invalid 'date'. Please, use YYYY-MM-DD string format")
    .required(),
  category: Joi.string().valid(...["to-do", "in-progress", "done"]),
})
  .custom((value, helpers) => {
    const startTime = new Date(`2023-02-03T${value.start}`);
    const endTime = new Date(`2023-02-03T${value.end}`);

    if (endTime <= startTime) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Please, set correct time",
  });

const updateTaskSchema = Joi.object()
  .keys({
    title: addTaskSchema.extract("title").optional(),
    start: addTaskSchema.extract("start").optional(),
    end: addTaskSchema.extract("end").optional(),
    priority: addTaskSchema.extract("priority").optional(),
    date: addTaskSchema.extract("date").optional(),
    category: addTaskSchema.extract("category").optional(),
  })
  .or("title", "start", "end", "priority", "date", "category")
  .custom((value, helpers) => {
    const startTime = new Date(`2023-02-03T${value.start}`);
    const endTime = new Date(`2023-02-03T${value.end}`);

    if (endTime <= startTime) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Please, set correct time",
  });

module.exports = { addTaskSchema, updateTaskSchema };
