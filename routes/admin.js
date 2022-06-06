var express = require("express");
const { Scholarship } = require("../models/scholarship");
var router = express.Router();
const validateScholarship = require("../middlewares/validateScholarship");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");



router.get('/', function (req, res, next) {
    res.render("adminPanel");
});
/* GET users listing. */
router.get("/scholarships", auth, admin, async function (req, res, next) {
    let scholarships = await Scholarship.find();
    res.render("adminScholarships", { scholarships });
});

// Get single

router.get("/scholarships/:id", async function (req, res, next) {
    try {
        let scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship)
            return res.status(400).send("No Scholarship against given ID");
        return res.render("adminSingleScholarship", { scholarship });
    } catch (error) {
        return res.status(400).send("Invalid ID");
    }
});

// Post


router.get("/scholarship/add", function (req, res, next) {
    res.render("addScholarship");
});


router.post("/scholarships/add", validateScholarship, async function (req, res, next) {
    let scholarship = new Scholarship();
    scholarship.title = req.body.title;
    scholarship.description = req.body.description;
    scholarship.program = req.body.program;
    scholarship.amount = req.body.amount;
    scholarship.date = req.body.date;
    scholarship.eligibility = req.body.eligibility;
    scholarship.link = req.body.link;

    await scholarship.save();
    res.redirect("/admin/scholarships");
});

// Put
router.get("/scholarships/edit/:id", async function (req, res, next) {
    let scholarship = await Scholarship.findById(req.params.id);
    res.render("editScholarship", { scholarship });
});

router.post("/scholarships/edit/:id", validateScholarship, async function (req, res, next) {
    let scholarship = await Scholarship.findById(req.params.id);
    scholarship.title = req.body.title;
    scholarship.description = req.body.description;
    scholarship.program = req.body.program;
    scholarship.amount = req.body.amount;
    scholarship.date = req.body.date;
    scholarship.eligibility = req.body.eligibility;
    scholarship.link = req.body.link;

    await scholarship.save();

    res.redirect("/admin/scholarships");
});

//   Delete

router.get("/scholarships/delete/:id", async function (req, res, next) {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.redirect("/admin/scholarships");
});

module.exports = router;
