const jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
const { User } = require("../models/user");

require("dotenv").config();

async function auth(req, res, next) {
  let token = req.header.authorization;
  if (!token) return res.render("login");
  try {
    let decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("Invalid Token: User don't exist");
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
}

module.exports = auth;
