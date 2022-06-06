var express = require("express");
const { Scholarship } = require("../models/scholarship");
var router = express.Router();
const validateScholarship = require("../middlewares/validateScholarship");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let scholarships = await Scholarship.find();
  res.render("listScholarships", { scholarships });
});

// Get single

router.get("/:id", async function (req, res, next) {
  try {
    let scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship)
      return res.status(400).send("No Scholarship against given ID");
    return res.render("singleScholarship", { scholarship });
  } catch (error) {
    return res.status(400).send("Invalid ID");
  }
});

// Favorites route

router.get("/favorites/:id", auth, async function (req, res, next) {
  const scholarship = await Scholarship.findById(req.params.id);
  let favorites = [];
  if (req.cookies.favorites) favorites = req.cookies.favorites;
  favorites.push(scholarship);
  res.cookie("favorites", favorites);
  res.redirect("/scholarships");
});

module.exports = router;
