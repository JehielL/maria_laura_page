const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./recipe.js');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/apprecipe', { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports = Recipe;

app.use(express.json());

// Middleware para manejar errores asincrónicos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
  next(); // Asegurar que la ejecución continúe
});

const publicPath = path.join(__dirname, '');
app.use(express.static(publicPath));

// Ruta para recetas.html
app.get('/recetas.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'recetas.html'));
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Ruta para guardar una receta
app.post('/apprecipe', async (req, res) => {
  const {
    image,
    title,
    prices,
    category,
    ingredients,
    amounts,
    elaboration,
    totalPrice,
  } = req.body;

  try {
    const newRecipe = new Recipe({
      image,
      title,
      prices,
      category,
      ingredients,
      amounts,
      elaboration,
      totalPrice,
    });

    await newRecipe.save();

    res.status(200).json({ success: true, message: 'Receta guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la receta:', error);
    res.status(500).json({ success: false, message: 'Error al guardar la receta', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
