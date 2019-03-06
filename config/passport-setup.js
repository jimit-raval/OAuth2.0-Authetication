const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./keys");
const User = require("../models/user");

//=================
//Google Strategy
//=================
passport.use(new GoogleStrategy({
    //code for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    //Chek if user is exists in db
    User.findOne({
        googleId: profile.id
    }).then((foundUser) => {
        if (foundUser) {
            //already have this user in db
            // console.log("User is: " + foundUser);
            done(null, foundUser);
        } else {
            //if not, create new user in db
            new User({
                provider: profile.provider,
                googleId: profile.id,
                username: profile.displayName,
                email: profile.email,
                gender: profile.gender,
                image: profile._json.image.url
            }).save().then((newUser) => {
                // console.log("New Created User: " + newUser);
                done(null, newUser);
            });
        }
    });
}));


//=================
//Facebook Strategy
//=================
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    //chek if user is exists in db
    User.findOne({
        facebookId: profile.id
    }).then((foundUser) => {
        if (foundUser) {
            //already have this user in db
            // console.log("User is: " + foundUser);
            done(null, foundUser);
        } else {
            //Create new user in db
            new User({
                provider: profile.provider,
                facebookId: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                // console.log("New Created User: " + newUser);
                done(null, newUser);
            });
        }
    });

}));