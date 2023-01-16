const express = require('express')
var router = express.Router()
const User = require('../models/user')
const passport = require('../passport') 

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
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ')
        next()
    },
   passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
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