const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const GoogleStrategy = require("passport-google-oauth2");
const FacebookStrategy = require("passport-facebook");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");


//MONGOOSE SETUP
mongoose.connect("mongodb://localhost/Oauth", {
    useNewUrlParser: true
});

//REQUIRE MODELS
var User = require("./models/user");

//REQUIRE ROUTES
var authRoutes = require("./routes/auth-routes");

//set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookie.key]
}));

//PASSPORT SETUP
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//SET LOCALS VAR
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Set View Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//USE ROUTES
app.use(authRoutes);

//Index ROUTE
app.get("/", (req, res) => {
    res.render("home");
});


//SERVER SETUP
app.listen("3000", () => {
    console.log("SERVER IS STARTED");
});