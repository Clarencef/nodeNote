'use strict'
const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add Articles'
  })
})

// get single article
router.get('/:id', (req, res) => {
  Article.findById(req.params.id, function (err, article) {
    console.log(article);
    User.findById(article.author, function (err, user) {
      console.log(user);
      res.render('article', {
        article: article,
        author: user.name
      });
    });
  });
})

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, function (err, article) {
    if (article.author != req.user._id) {
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_article', {
      title: 'Edit article',
      article
    });
  });
})

router.post('/add', (req, res) => {
  req
    .checkBody('title', 'Title is required')
    .notEmpty();
  // req
  //   .checkBody('author', 'Author is required')
  //   .notEmpty();
  req
    .checkBody('body', 'Body is required')
    .notEmpty();

  let article = new Article();
  article.title = req.body.title;
  article.author = req.user._id;
  article.body = req.body.body;

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('add_article', {
      title: 'Add Article',
      errors
    });
  } else {
    article
      .save(function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          req.flash('success', 'Article added');
          res.redirect('/');
        }
      });
  }
})

// update Submit POST Route
router.post('/edit/:id', (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {
    _id: req.params.id
  }

  Article.update(query, article, function (err) {
    if (err)
      return console.log(err);
    req.flash('success', 'Article Updated');
    res.redirect('/');
  });
});

router.delete('/:id', (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
  }

  let query = {
    _id: req.params.id
  }

  Article.findById(req.params.id, function (err, article) {
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query, function (err) {
        if (err)
          return console.log(err);
        res.send('Delete article success');
      });
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please Login');
    res.redirect('/users/login');
  }
}

module.exports = router;