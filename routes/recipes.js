const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); 
const Cook = require('../models/Cook');
const mongoose = require('mongoose');

/* GET home page */
router.get('/', (req, res, next) => { //navigation througt the pages that we are going to have
  res.render('index');
});


const Recipes = require("../models/Recipe.js")

router.get('/recipes', (req, res, next) => {
  Recipes.find({})
  .populate("creator")
    .then((recipes) => {//new information received from mongoose
      res.render('recipes.hbs', { recipes })
    })
    .catch(err => {
      console.log('error' + err)
    })
})
  router.get("/recipes/add", (req, res) => {
    Cook.find({})
      .then((cooks) => {
        res.render("addRecipe", { cooks })
      })
      .catch(() => {
        next()
      })
    })

  router.post("/recipes/add", (req, res) => {
    let newRecipe = {
      title: req.body.title,
      level: req.body.level,
      ingredients: req.body.ingredients,
      cuisine: req.body.cuisine,
      dishType: req.body.dishType,
      image: req.body.image,
      duration: req.body.duration,
      creator: mongoose.Types.ObjectId(req.body.creator),
      created: req.body.created
    }
    Recipe.create(newRecipe)
    .then(() => {
      res.redirect("/recipes/")
    })
    .catch((err) => {
      console.log(err)
    })
  })
// EDIT
router.get("/recipe/:id", (req, res, next) => { //params : //insted of query ?
  Recipes.findOne({_id: req.params.id})
  .populate("creator")
    .then((recipe) => {
    
      res.render('recipeDetailed.hbs', {
        recipe
      })
    })
    .catch((err) => {
      console.log('error' + err)
      next ()
    })
})


router.get('/recipes/edit', (req, res, next) => {
  Recipes.findById(req.query.id)
    .populate("creator") //name of the field you want to populate. Check in the model
    .then((recipe) => {
      Cook.find({})
        .then((allCooks)=> {
          res.render('recipe-edit.hbs', {
          recipe, allCooks })
    })
  })
    .catch((err)=> {
      console.log('error' + err)
      next()
    })
    })
  // find recipe with req.query.i d

router.post('/recipes/edit/:id', (req, res, next) => {
  const updateRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType:req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    creator: mongoose.Types.ObjectId(req.body.creator),
    created: req.body.created
  }

  // const {
  //   title,
  //   level,
  //   ingredients,
  //   cuisine,
  //   dishType,
  //   image,
  //   duration,
  //   creator,
  //   created
  // } = req.body;
  // Recipe.findByIdAndUpdate(req.params.id, updateRecipe, {new: true})
  Recipe.updateOne({_id: req.params.id}, updateRecipe, {new: true})
  .then(() => {
    res.redirect("/recipes")
  })
  .catch((error) => {
    console.log(error);
    next()
  });
});
// ADD
// router.get('/recipes/add', (req, res, next) => {
//   res.render("addRecipe");
// })

// router.post('/recipes/add', (req, res, next) => {
//   console.log('req.body', req.body)
  
//    const {
//      title,
//      level,
//      ingredients,
//      cuisine,
//      dishType,
//      image,
//      duration,
//      creator,
//      created
//    } = req.body;
//    const newRecipe = new Recipe({
//      title,
//      level,
//      ingredients,
//      cuisine,
//      dishType,
//      image,
//      duration,
//      creator,
//      created
//    })
//   newRecipe.save(req.body)
//     .then((recipe) => {
//       res.render('addRecipe', {
//         recipe
//       })
//     })
//     .catch(err => {
//       console.log('error' + err)
//     })
// })

router.get('/delete/:id', (req, res, next) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then((recipe) => {
      res.redirect('/recipes');
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router;
