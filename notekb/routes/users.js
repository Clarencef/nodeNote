'use strict'
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirm_password', 'Password do not match').equals(req.body.password);
  console.log('in')
  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors,
    });
  } else {
    let newUser = new User({
      name,
      email,
      username,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if(err) return console.log(err);
        newUser.password = hash;
        newUser.save(function (err) {
          if (err) return console.log(err);
          req.flash('success', 'You are now registered and can log in');
          res.redirect('/users/login');
        })
      });
    })
  }
})

// Login Form
router.get('/login', (req, res) => {
  res.render('login')
})

// Login process
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
})

module.exports = router;