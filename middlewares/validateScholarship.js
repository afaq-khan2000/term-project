const { validate } = require("../models/scholarship");

function validateScholarship(req, res, next) {
  let { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateScholarship;
