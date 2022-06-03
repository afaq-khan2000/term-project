var express = require("express");
const { Scholarship } = require("../models/scholarship");
var router = express.Router();
const validateScholarship = require("../middlewares/validateScholarship");
const checkSessionAuth = require("../middlewares/checkSessionAuth");

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

// Post
router.post("/", validateScholarship, async function (req, res, next) {
  let scholarship = new Scholarship();
  scholarship.title = req.body.title;
  scholarship.description = req.body.description;
  scholarship.program = req.body.program;
  scholarship.amount = req.body.amount;
  scholarship.date = req.body.date;
  scholarship.eligibility = req.body.eligibility;
  scholarship.link = req.body.link;

  await scholarship.save();

  res.send(scholarship);
});

// Put
router.put("/:id", validateScholarship, async function (req, res, next) {
  let scholarship = await Scholarship.findById(req.params.id);
  scholarship.title = req.body.title;
  scholarship.description = req.body.description;
  scholarship.program = req.body.program;
  scholarship.amount = req.body.amount;
  scholarship.date = req.body.date;
  scholarship.eligibility = req.body.eligibility;
  scholarship.link = req.body.link;

  await scholarship.save();

  res.send(scholarship);
});

//   Delete

router.delete("/:id", async function (req, res, next) {
  let scholarship = await Scholarship.findByIdAndDelete(req.params.id);
  res.send(scholarship);
});

// Favorites route

router.get("/favorites/:id", checkSessionAuth, async function (req, res, next) {
  const scholarship = await Scholarship.findById(req.params.id);
  let favorites = [];
  if (req.cookies.favorites) favorites = req.cookies.favorites;
  favorites.push(scholarship);
  res.cookie("favorites", favorites);
  res.redirect("/scholarships");
});

module.exports = router;
