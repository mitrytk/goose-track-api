const Joi = require("joi");

const reviewSchema = Joi.object({
    rating: Joi.string().valid(1, 2, 3, 4, 5).required(),
    review: Joi.string().min(6).max(300).required(),
  });

  module.exports = {
    reviewSchema,
};