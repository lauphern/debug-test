const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const seedRecipes = [{
    title: "Crock Pot Roast",
    level: "UltraPro Chef",
    ingredients: [{
        quantity: "1",
        name: " beef roast",
        type: "Meat"
      },
      {
        quantity: "1 package",
        name: "brown gravy mix",
        type: "Baking"
      },
      {
        quantity: "1 package",
        name: "dried Italian salad dressing mix",
        type: "Condiments"
      },
      {
        quantity: "1 package",
        name: "dry ranch dressing mix",
        type: "Condiments"
      },
      {
        quantity: "1/2 cup",
        name: "water",
        type: "Drinks"
      }
    ],
    cuisine: "French",
    dishType: "Dish",
    image: "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
    duration: 5, 
    creator: "Ronald B.",
    created: 2019-03-15
  },
  {
  title: "Roasted Asparagus",
    level: "Easy Peasy",
    ingredients: [{
        quantity: "1 lb",
        name: "asparagus",
        type: "Produce"
      },
      {
        quantity: "1 1/2 tbsp",
        name: "olive oil",
        type: "Condiments"
      },
      {
        quantity: "1/2 tsp",
        name: "kosher salt",
        type: "Baking"
      }
    ],
    cuisine: "Spanish",
    dishType: "Other",
    image: "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/50/84/7/picMcSyVd.jpg",
    duration: 20,
    creator: "Katy B.",
    created: 2018-04-19
  },
  {
    title: "Curried Lentils and Rice",
    level: "Amateur Chef",
    ingredients: [{
        quantity: "1 quart",
        name: "beef broth",
        type: "Misc"
      },
      {
        quantity: "1 cup",
        name: "dried green lentils",
        type: "Misc"
      },
      {
        quantity: "1/2 cup",
        name: "basmati rice",
        type: "Misc"
      },
      {
        quantity: "1 tsp",
        name: "curry powder",
        type: "Condiments"
      },
      {
        quantity: "1 tsp",
        name: "salt",
        type: "Condiments"
      }
    ],
    cuisine: "Indian",
    dishType: "Dish",
    image: "http://dagzhsfg97k4.cloudfront.net/wp-content/uploads/2012/05/lentils3.jpg",
    duration: 1,
    creator: "Lucy B.",
    created: 2015-04-21
  },
  {
    title: "Big Night Pizza",
    level: "Amateur Chef",
    ingredients: [ 
        {
          quantity: "5 teaspoons",
          name: "yeast",
          type: "Baking"
        }, 
        {
          quantity: "5 cups",
          name: "flour",
          type: "Baking"
        }, 
        {
          quantity: "4 tablespoons",
          name: "vegetable oil",
          type: "Baking"
        }, 
        {
          quantity: "2 tablespoons",
          name: "sugar",
          type: "Baking"
        }, 
        {
          quantity: "2 teaspoons",
          name: "salt",
          type: "Baking"
        }, 
        {
          quantity: "2 cups",
          name: "hot water",
          type: "Misc"
        }, 
        {
          quantity: "1/4 cup",
          name: "pizza sauce",
          type: "Misc"
        }, 
        {
          quantity: "3/4 cup",
          name: "mozzarella cheese",
          type: "Dairy"
    }],
    cuisine: "Italian",
    dishType: "Dish",
    image: "http://upload.wikimedia.org/wikipedia/commons/c/c7/Spinach_pizza.jpg",
    duration: 40,
    creator: "Mary S.",
    created: 2017-08-18
  },
  {
    title: "Cranberry and Apple Stuffed Acorn Squash Recipe",
    level: "UltraPro Chef",
    ingredients: [{
            quantity: "2",
            name: "acorn squash",
            type: "Produce"
          },
          {
            quantity: "1",
            name: "boiling water",
            type: "Drinks"
          },
          {
            quantity: "2",
            name: "apples chopped into 1.4 inch pieces",
            type: "Produce"
          },
          {
            quantity: "1/2 cup",
            name: "dried cranberries",
            type: "Produce"
          },
          {
            quantity: "1 teaspoon",
            name: "cinnamon",
            type: "Baking"
          },
          {
            quantity: "2 tablespoons",
            name: "melted butter",
            type: "Dairy"
      }],
      cuisine: "American",
      dishType: "Dessert",
      image: "http://elanaspantry.com/wp-content/uploads/2008/10/acorn_squash_with_cranberry.jpg",
      duration: 1.5,
      creator: "Roman W.",
      created: 2019-02-13
    }
  ];

  Recipe.create(seedRecipes, (err) => {
    err ? console.log(`there is a seed error`) : console.log(`we have seeded succesfully to our database`);
    })
