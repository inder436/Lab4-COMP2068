﻿'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
/*POST for login*/
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));
/*Logout*/
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});
/*POST for register*/
router.post('/register', function (req, res) {
    //username
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            username: req.body.username,
            password: hash
        }
        //Check if user already exist
        userModel.find({ username: registerUser.username }, function (err, user) {
            if (err) console.log(err);
            if (user.length) console.log('Username already exists.');
            const newUser = new userModel(registerUser);
            newUser.save(function (err) {
                console.log('Arr!!');
                if (err) console.log(err);
                req.login(newUser, function (err) {
                    console.log('Try login');
                    if (err) console.log(err);
                    return res.redirect('/users');
                });
            });
        });
    })
});
/*GET for register*/
router.get('/register', function (req, res) {
    res.render('register');
});
/*GET for login*/
router.get('/login', function (req, res) {
    res.render('login');
});
module.exports = router;
