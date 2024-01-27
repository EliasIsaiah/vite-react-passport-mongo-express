require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require("mongoose");
const session = require('express-session');

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
    done(null,)
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// app.post('/login', passport.authenticate('local', (req, res) => {
//     res.redirect('/');
// }))

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("req", req);
        res.send("hello world");
        // res.redirect('/');
    });

app.get('/', function (req, res) {
    res.send("hello world");
})

mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`demo app listening on port ${PORT} 🐈`)
})