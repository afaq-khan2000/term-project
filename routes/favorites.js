var express = require("express");
const Scholarship = require("../models/scholarship");
var router = express.Router();
var checkSessionAuth = require('../middlewares/checkSessionAuth');

router.get("/", checkSessionAuth, function (req, res, next) {
    let favorites = req.cookies.favorites;
    if (!favorites) favorites = [];
    res.render("favorites", { favorites });
});

router.get("/delete/:id", async function (req, res, next) {
    let favorites = [];
    if (req.cookies.favorites) favorites = req.cookies.favorites;
    favorites.splice(favorites.findIndex((c) => c._id == req.params.id), 1);
    res.cookie("favorites", favorites);
    res.redirect("/favorites");
});

module.exports = router;
