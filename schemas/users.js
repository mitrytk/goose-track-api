const Joi = require("joi");
// const emailRegexp = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// .pattern(new RegExp(emailRegexp))

module.exports = {
  registerSchema,
  loginShema,
};
