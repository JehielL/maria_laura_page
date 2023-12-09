const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe.js');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/apprecipe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Middleware para manejar errores asincrónicos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.post('/guardar-receta', async (req, res) => {
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


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
