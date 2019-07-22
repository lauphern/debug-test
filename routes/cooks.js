const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');

const Cooks = require("../models/Cook.js")

router.get('/cooks/add', (req, res, next) => {
  res.render("addCook")
});

router.post('/cooks/add', (req, res, next) => {
  const { name, cuisine} = req.body;
  const newCook = new Cook({name, cuisine})
  console.log('req.body', req.body)
  newCook.save()
  .then((cook) => {
    res.redirect('/cooks')
  })
  .catch((error) => {
  console.log(error)
})
})