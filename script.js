function toggleImage() {
  const showImage = document.getElementById('retrete');
  showImage.style.display = showImage.style.display === 'none' ? 'block' : 'none';
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-bs-theme');
  const logo = document.getElementById('toggleTheme');

  body.setAttribute('data-bs-theme', currentTheme === 'dark' ? 'light' : 'dark');
  const isDarkTheme = currentTheme === 'dark';
  logo.classList.toggle('fa-regular', !isDarkTheme);
  logo.classList.toggle('fa-solid', isDarkTheme);
  logo.classList.toggle('fa-sun', isDarkTheme);
  logo.classList.toggle('fa-moon', !isDarkTheme);
}

function showPassword() {
  const passInput = document.getElementById('pass');
  const toggleButton = document.getElementById('eyeButton');

  passInput.type = passInput.type === 'password' ? 'text' : 'password';
  toggleButton.innerHTML = passInput.type === 'password' ? createEyeIcon('fa-solid') : createEyeIcon('fa-regular');
}

async function saveRecipeToServer(recipeData) {
  try {
    const response = await fetch('http://localhost:27017/guardar-receta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });

    const result = await response.json();

    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('Error al enviar la receta al servidor:', error);
  }
}


async function handleFormSubmit(event) {
  event.preventDefault();
  

  const image = getValue('recipeImage');
  const title = getValue('recipeTitle');
  const elaboration = getValue('recipeElaboration');
  const category = getValue('recipeCategory');
  const ingredients = getValues('recipeIngredients[]');
  const amounts = getValues('recipeAmounts[]');
  const prices = getValues('recipePrices[]');

  try {
    // Calcular el precio total automáticamente
    const totalPrices = prices.map(parseFloat).reduce((acc, price) => acc + price, 0);

   Price: totalPrices,
   
    // Mostrar resultados
    displayRecipeResult({
      image,
      title,
      elaboration,
      category,
      ingredients,
      amounts,
      prices,
      totalPrice: totalPrices,
    });

    // Limpiar el formulario después de enviar la información
    document.getElementById('recipeForm').reset();
  } catch (error) {
    console.error('Error al enviar la receta:', error);
  }
}

function getValue(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value : handleValueError(elementId);
}

function handleValueError(elementId) {
  console.error(`Element with ID ${elementId} not found.`);
  return '';
}

function getValues(elementName) {
  return Array.from(document.getElementsByName(elementName)).map(input => input.value);
}

function addIngredient() {
  const ingredientContainer = document.getElementById('ingredientContainer');
  const newIngredient = createIngredientElement();
  ingredientContainer.appendChild(newIngredient);
}

function createIngredientElement() {
  const newIngredient = document.createElement('div');
  newIngredient.className = 'ingredient-input';

  newIngredient.innerHTML = `
    <p>Nuevo Ingrediente por agregar :</p>
    <input type="text" class="form-control mb-3" name="recipeIngredients[]" placeholder="Ingrediente" required>
    <input type="text" class="form-control mb-3" name="recipeAmounts[]" placeholder="Cantidad" required>
    <input type="text" class="form-control mb-3" name="recipePrices[]" placeholder="Precio por ingrediente" required>
    <button type="button" class="btn btn-danger btn-sm mb-3" onclick="removeIngredient(this)">Eliminar</button>
  `;

  return newIngredient;
}

function removeIngredient(button) {
  const ingredientContainer = document.getElementById('ingredientContainer');
  const ingredientInput = button.parentNode;
  ingredientContainer.removeChild(ingredientInput);
}

function displayRecipeResult({ image, title, elaboration, category, ingredients, amounts, prices, totalPrice }) {
  const tableBody = document.getElementById('recipeTableBody');
  const imagesContainer = document.getElementById('recipeImages');

  if (!tableBody || !imagesContainer) {
    console.error('Error: No se encontró el cuerpo de la tabla o el contenedor de imágenes.');
    return;
  }

  // Crear fila para la tabla
  const row = tableBody.insertRow();
  row.innerHTML = `
    <td><img src="${image}" alt="${title}" class="img-fluid" style="max-width: 100px;"></td>
    <td>${title}</td>
    <td>${prices.join('<br>')}</td>
    <td>${category}</td>
    <td>${ingredients.join('<br>')}</td>
    <td>${amounts.join('<br>')}</td>
    <td>${elaboration}</td>
    <td>${totalPrice.toFixed(2)}</td> <!-- Nueva celda para mostrar el precio total -->
  `;
}

document.getElementById('recipeForm').addEventListener('submit', handleFormSubmit);
