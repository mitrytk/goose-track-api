const { isValid, parse } = require("date-fns");
const {HttpError} = require("../helpers");

const validateMonth = (req, res, next) => {
  const { month, year } = req.params;

  const date = parse(`${year}-${month}`, "yyyy-MM", new Date());

  if (isValid(date)) {
    next();
  } else {
    next( new HttpError(400, "Invalid month or year"));
  }
};


module.exports = {validateMonth}