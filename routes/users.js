const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

router.get('/', (req, res, next) => { //navigation througt the pages that we are going to have
  res.render('index');
});
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs', {s});
})
router.post('/signup', (req, res, next) => {

})

module.exports = router;