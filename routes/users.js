'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
/* GET */
router.get('/', function (req, res) {
    try {
        userModel.find({}, function (err, foundUsers) {
            console.log(err);
            console.log(foundUsers);
            //getting user list from DB
            res.render('users', { data: foundUsers, user: req.user });
        });
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = router;
