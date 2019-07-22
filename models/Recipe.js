const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const recipeSchema = mongoose.model("recipes", new Schema({
        title: String,
        level: {type: String,
           enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
          }, 
        ingredients: {type: Array},
        cuisine: String,
        dishType: {type: String,
           enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
             },
        image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
       },
        duration: {type: Number, 
               minimum: 0
             },
        cook: {type: ObjectId, ref: "cooks"},
        created: {type: Date, 
           default: Date.now
           }
 }), "recipes");


module.exports = recipeSchema;
