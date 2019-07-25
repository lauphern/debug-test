var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt');



router.get('/register', (req, res, next) => {
  
  res.render('register.hbs');
});

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (error, hash) {
  if (error) throw new Error("Encryption error");

  let newUser = {
    username: req.body.username,
    password: hash
  }

  User.create(newUser)
    .then((user) => {
      res.redirect('/users/login');
    })
    .catch((err) => {
      res.send("error");
    });
  
});
});

router.get('/login', function (req, res, next) {
  debugger
  res.render('login.hbs')
});

router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user) {
      bcrypt.compare(req.body.password, user.password, function (err, match) {
        if (err) throw new Error("Encryption error");
        if (match) {
          req.session.user = user;
          res.redirect("/users/profile");
        } else {
          // password incorrect
          res.send("Invalid credentials")
        }
      })
      } else {
            // user not found
              res.send("Invalid credentials");
            }
  })
  .catch((error) => {
  res.send("error")
  })
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render('profile.hbs')
  } else {
    res.redirect("/users/login")
  }
})

module.exports = router;