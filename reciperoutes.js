const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Recipe = require('./recipe.js');

// Ruta para guardar una nueva receta
router.post('/recipes', [
  
  
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

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
    res.status(500).json({ success: false, message: 'Error al guardar la receta', error: error.message });
  }
});

// Otras rutas pueden ser definidas aquí...

module.exports = router;
