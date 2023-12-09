const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Agrega el paquete body-parser para analizar los datos del formulario

const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl = 'mongodb://localhost:27017/mydatabase'; // Reemplaza con tu URL de conexión de MongoDB

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); // Usa body-parser para analizar los datos del formulario
app.use(express.static('public'));

// Resto de tu configuración de Express...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
