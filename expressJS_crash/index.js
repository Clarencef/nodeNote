var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;
var app = express();

// var logger = function(req, res, next) {
//   console.log('Logging...');
//   next();
// }

// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set Static path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
})

// express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// send json 
// var peoples = [
//   {
//     name: 'Albert',
//     age: 30,
//   },
//   {
//     name: 'Sarah',
//     age: 25,
//   },
//   {
//     name: 'Tim',
//     age: 44,
//   }
// ];

// app.get('/', function(req, res) {
//   res.json(peoples);
// })

// var users = [
//   {
//     id: 1,
//     first_name: 'Albert',
//     last_name: 'Fang',
//     email: 'hr00090241@gmail.com',
//   },
//   {
//     id: 2,
//     first_name: 'Ben',
//     last_name: 'Wei',
//     email: 'ben@gmail.com',
//   },
//   {
//     id: 3,
//     first_name: 'Tom',
//     last_name: 'Chou',
//     email: 'Tom@gmail.com',
//   }
// ]

app.get('/', function(req, res) {
  db.users.find(function(err, docs){
    res.render('index', {
      title: 'Hosts',
      users: docs,
    });
  });
})

app.post('/users/add', function (req, res) {
  req.checkBody('first_name', 'First Name is Rquired').notEmpty();
  req.checkBody('last_name', 'Last Name is Rquired').notEmpty();
  req.checkBody('email', 'Email Rquired').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('index', {
      title: 'Hosts',
      users: users,
      errors: errors,
    });
    console.log(errors);
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };
    db.users.insert(newUser, function (err, result) {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
    });
    console.log('Success');
    // var newUserList = users.concat(newUser);
    // res.send(newUserList);
  }
});

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}, function (err, result) {
    if (err) return console.log(err);
    res.redirect('/');
  });
});

app.listen(3000, function() {
  console.log('Server started on port 3000...')
})