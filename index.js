const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
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
mongoose.connect('mongodb://localhost/starter-code', { useNewUrlParser: true })
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

//NEW
// defining custom route protection middleware
let protectRoute = function(req, res, next) {
  
  if (req.session.user) { //changed!!!!
  res.redirect("/users/login")
  }else {
    next()
   }
 }

app.use("/", require("./routes/home"))
app.use("/users", protectRoute, require("./routes/users"))
app.use("/", protectRoute, require("./routes/recipes"))


app.listen(3000, () => {
  console.log('My app listening on port 3000!')
});