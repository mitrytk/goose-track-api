const Joi = require("joi");
// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
  birthday: Joi.string().min(10).max(10),
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
