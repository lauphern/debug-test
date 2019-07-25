const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => { //navigation througt the pages that we are going to have
  res.render('index');
});

module.exports = router;
