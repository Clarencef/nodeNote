'use strict'

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/database');

// setup mongo db
mongoose.connect(config.database);
let db = mongoose.connection;

// check for DB connection
db.once('open', () => {
  console.log('connected to mongoDB');
})

// check for DB errors
db.on('error', (err) => {
  console.log(err);
})

const app = express();

// Bring in Models
let Article = require('./models/article');

// use body parser middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {param: formParam, msg: msg, value: value};
  }
}));

// Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set bootstrap and jquery
app.use('/libraryJS', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/libraryJS', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/libraryCSS', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
  Article
    .find({}, function (err, articles) {
      if (err) 
        return console.log(err);
      res.render('index', {
        title: 'Hello',
        articles
      });
    });
});

// Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);

app.listen(3000, () => {
  console.log('server start at port 3000');
})