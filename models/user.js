const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    provider: String,
    googleId: String,
    facebookId: String,
    username: String,
    email: String,
    gender: String,
    image: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;