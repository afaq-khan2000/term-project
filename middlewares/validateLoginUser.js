const { validateLogin } = require("../models/user");

function validateLoginUser(req, res, next) {
  let { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateLoginUser;