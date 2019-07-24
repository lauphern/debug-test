const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
// const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
// const data = require('./data.js');  // Import of the data from './data.js'
const path = require('path');
const express = require('express');

const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

const app = express(); //my own server named app, express server handling requests and responses

app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 60000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 // 1day
  }),
  resave: false,
  saveUninitialized: true,
}))

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



app.use(express.static('public'))// everything inside publike will be available

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');//tell express app that hbs is in charge of rendering the html files
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use("/", require("./routes/recipes"))
app.use("/users", require("./routes/users"))


// const Recipes = require("./models/Recipe.js")

// app.get('/recipes', (req, res, next) => {
//   Recipes.find({})
//     .then((recipes) => {
//       res.render('recipes.hbs', {
//         recipes
//       })
//     })
//     .catch(err => {
//       console.log('error' + err)
//     })
// })

// app.get("/recipe/:id", (req, res, next) => { //params : //insted of query ?
//   Recipes.findById(req.params.id)
//     .then((recipe) => {
//       res.render('recipeDetailed.hbs', {
//         recipe
//       })
//     })
//     .catch(err => {
//       console.log('error' + err)
//     })
// })
// app.get('/recipes/add', (req, res, next) =>{
//   res.render("addRecipe");
// })
// router.post('/recipes/add', (req, res, next) => {
//   const {title, level, ingredients, cuisine, dishType, image, duration, creator, created} = req.body;
//   const newRecipe = new Recipe({
//     title,
//     level,
//     ingredients,
//     cuisine,
//     dishType,
//     image,
//     duration,
//     creator,
//     created
//   })
//   newRecipe.save()
//     .then((recipe) => {
//         res.render('addRecipe', {
//           recipe
//         })
//       })
//       .catch(err => {
//         console.log('error' + err)
//       })
// })

app.listen(3000, () => {
  console.log('My app listening on port 3000!')
});