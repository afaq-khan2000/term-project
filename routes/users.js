var express = require('express');
var router = express.Router();
const { User } = require("../models/user");
var validateRegisterUser = require('../middlewares/validateRegisterUser');
var validateLoginUser = require('../middlewares/validateLoginUser');

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", validateRegisterUser, async function (req, res, next) {
  let user = new User(req.body);
  await user.save();
  res.redirect("/");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", validateLoginUser, async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.redirect("/users/login");
  req.session.user = user;
  res.redirect("/");
});


router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/users/login");
});

module.exports = router;
