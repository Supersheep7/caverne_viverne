const express = require('express')
var router = express.Router()
const User = require('../models/user')
const passport = require('../passport') 
const { body, validationResult } = require("express-validator");

router.post('/', (req, res) => {
    console.log('user signup');
    const { username, password } = req.body
    req.session.username = req.body.username
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })  
}) 

router.post( '/login',
    body("username").trim().isLength( {min: 1} ).escape(),
    body("password").trim().isLength( {min: 1} ).escape(),
   passport.authenticate('local'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).end()
        }
        else {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username,
            password: req.user.password
        };
        res.send(userInfo);
        }
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.body)
    if (req.user.username === "Cacciatorpediniere") {
        res.json({ user: req.user, key: process.env.CACCIAKEY })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', function(req, res, next){

    req.logout(function(err) {
      if (err) { return next(err); }
      res.send('logged out');
    });

})

module.exports = router