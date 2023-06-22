const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  volidateBody,
  isValidId,
  isFavoriteField,
} = require("../../middlewares/index");
const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/index");

//Routers

module.exports = router;
