const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  image: String,
  title: String,
  prices: Number,
  category: String,
  ingredients: String,
  amounts: Number,
  elaboration: String,
  totalPrice: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
