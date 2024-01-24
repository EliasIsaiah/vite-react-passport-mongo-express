require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require("mongoose");

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username === "elias" && password === "password") done(null, user);
        else done(new Error("invalid user"))
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, { username: "elias", password: "password", id: 1 })
})

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', (req, res) => {
    res.send("logged in!");
}))

mongoose.connect(process.env.MONGO_URI);