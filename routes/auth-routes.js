const express = require("express");
const router = require("express").Router();
const passport = require("passport");

//LOGIN
router.get("/auth/login", (req, res) => {
    res.render("login");
});

//LOGOUT
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//GOOGLE AUTH ROUTE
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

//GOOGLE CB ROUTE
router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
}));

//FACEBOOK AUTH ROUTE
router.get("/auth/facebook", passport.authenticate("facebook", {
    scope: ["email"]
}));

//FACEBOOK CB ROUTE
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
}));

//PROFILE
router.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", {
        user: req.user
    });
});


//MIDDLEWARE
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/login");
    }
};

module.exports = router;