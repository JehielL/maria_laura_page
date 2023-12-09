const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  image: String,
  title: String,
  category: String,
  results: String,
  elaboration: String,
  ingredients: [
    {
      ingredient: String,
      amount: String,
      price: String,
    },
  ],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
