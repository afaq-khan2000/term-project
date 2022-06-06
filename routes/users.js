var express = require('express');
var router = express.Router();
const { User } = require("../models/user");
var validateRegisterUser = require('../middlewares/validateRegisterUser');
var validateLoginUser = require('../middlewares/validateLoginUser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var dotenv = require("dotenv");

require("dotenv").config();

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", validateRegisterUser, async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists with this email");
  user = new User(req.body);
  await user.generateHashedPasswords();
  await user.save();
  res.redirect("/");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", validateLoginUser, async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.redirect("/users/login");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.render("login");
  let token = jwt.sign({ _id: user._id, name: user.name }, process.env.jwtPrivateKey);
  req.header.authorization = token;
  res.redirect("/");
});


router.get("/logout", function (req, res, next) {
  req.header.authorization = null;
  res.redirect("/users/login");
});

module.exports = router;
