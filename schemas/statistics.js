const Joi = require("joi");

const statisticsSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": "Must be string with format e.g: YYYY MM DD",
    })
    .required(),
});

module.exports = { statisticsSchema };
