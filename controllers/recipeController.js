const Recipe = require('../recipe');

exports.handleFormSubmit = async (req, res) => {
  try {
    const {
      image,
      title,
      category,
      results,
      elaboration,
      ingredients,
    } = req.body;

    // Crear una nueva instancia de Recipe con los datos del formulario
    const newRecipe = new Recipe({
      image,
      title,
      category,
      results,
      elaboration,
      ingredients: JSON.parse(ingredients), // Analiza la cadena JSON de ingredientes
    });

    // Guardar la receta en la base de datos
    await newRecipe.save();

    // Enviar respuesta al cliente
    res.status(200).json({ success: true, message: 'Recipe saved successfully' });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
