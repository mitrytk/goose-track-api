const Joi = require("joi");

const reviewSchema = Joi.object({
    owner: {
        name: Joi.string().min(3).max(30).required(),
        _id: Joi.string().required(),
        avatarUrl: Joi.string().required(),
    },
    rating: Joi.string().valid(1, 2, 3, 4, 5).required(),
    review: Joi.string().min(6).max(300).required(),
  });

  module.exports = {
    reviewSchema,
};