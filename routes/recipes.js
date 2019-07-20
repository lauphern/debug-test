const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); 

/* GET home page */
router.get('/', (req, res, next) => { //navigation througt the pages that we are going to have
  res.render('index');
});


const Recipes = require("../models/Recipe.js")

router.get('/recipes', (req, res, next) => {
  Recipes.find({})
    .then((recipes) => {
      res.render('recipes.hbs', {
        recipes
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
})

router.get("/recipe/:id", (req, res, next) => { //params : //insted of query ?
  Recipes.findById(req.params.id)
    .then((recipe) => {
      res.render('recipeDetailed.hbs', {
        recipe
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
})
router.get('/recipes/edit', (req, res, next) => {
  res.render("recipe-edit");
})
router.get('/recipes/edit', (req, res, next)=> {
  Recipe.findOne({_title: req.query.recipe_title})
    .then((recipe) =>{
      res.render('recipe-edit', {recipe});
    })
    .catch((error) =>{
      console.log(error)
    })
})
router.post('/recipes/edit', (req, res, next) => {
  
  const {
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created
  } = req.body;
  Recipe.findByIdAndUpdate({
    _id: req.query.recipe_id
  }, { $set: {title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created
  }})
  .then((recipe) => {
    res.redirect('/recipes');
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/recipes/add', (req, res, next) => {
  res.render("addRecipe");
})

router.post('/recipes/add', (req, res, next) => {
  console.log('req.body', req.body)
  
   const {
     title,
     level,
     ingredients,
     cuisine,
     dishType,
     image,
     duration,
     creator,
     created
   } = req.body;
   const newRecipe = new Recipe({
     title,
     level,
     ingredients,
     cuisine,
     dishType,
     image,
     duration,
     creator,
     created
   })
  newRecipe.save()
    .then((recipe) => {
      res.render('addRecipe', {
        recipe
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
})
//const Movie =require('../models/Movie.js')//reqiring schema

//router.get('/movies/', (req, res, next) => {
//Movie.find()
//.then(movies =>{
//res.render("movies", {movies})
//   console.log(movies)
// })
// .catch(error => {
//   console.log(error)
// })})

module.exports = router;
