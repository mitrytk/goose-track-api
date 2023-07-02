const Joi = require("joi");
// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const birthdayRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const changePasswordShema = Joi.object({
    password: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
});

const updateShema = Joi.object({
  email: Joi.string(),
  name: Joi.string().min(3).max(30),
  birthday: Joi.string().regex(birthdayRegex),
  phone: Joi.string().min(10),
  skype: Joi.string().min(3),
});

// .pattern(new RegExp(emailRegexp))

module.exports = {
  registerSchema,
  loginShema,
  updateShema,
  changePasswordShema,
};
