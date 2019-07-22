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

// router.get('/recipes/edit', (req, res, next) => {
//   Recipe.findOne({
//       _id: req.query.recipe_id
//     })
//     .then((recipe) => {
//       res.render('recipe-edit', {
//         recipe
//       });
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })

router.get("/recipe/:id", (req, res, next) => { //params : //insted of query ?
  Recipes.findOne({_id: req.params.id})
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
  Recipes.findById(req.query.id)
    .then((recipe) => {
      res.render('recipe-edit.hbs', {
        recipe
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
    })
  // find recipe with req.query.i d

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

  Recipe.updateOne({_id: req.query.id}, {$set: {title, level, ingredients, cuisine, dishType, image, duration, creator, created }}, {new: true})
  .then((recipe) => {
    res.redirect('/recipes')
  })
  .catch((error) => {
    console.log(error);
  });
});

//   Recipe.findByIdAndUpdate({
//     _id: req.query.recipe_id
//   }, { $set: {title,
//     level,
//     ingredients,
//     cuisine,
//     dishType,
//     image,
//     duration,
//     creator,
//     created
//   }})
//   .then((recipe) => {
//     res.redirect('/recipes');
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// })




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
  newRecipe.save(req.body)
    .then((recipe) => {
      res.render('addRecipe', {
        recipe
      })
    })
    .catch(err => {
      console.log('error' + err)
    })
})

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
