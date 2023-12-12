const express = require('express');
const router = express.Router();
const Recipe = require('./recipe.js');

// Ruta para guardar una nueva receta
router.post('/recipe', async (req, res) => {
  try {
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
    res.status(500).json({ success: false, message: 'Error al guardar la receta' });
  }
});

// Otras rutas pueden ser definidas aquí...

module.exports = router;
