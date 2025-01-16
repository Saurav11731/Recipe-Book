// Recipe Data
const recipes = [
    {
      id: 1,
      category: "Breakfast",
      title: "Pancakes",
      image: "pancakes.png",
      description: "Fluffy pancakes with syrup.",
      ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
      instructions: "Mix ingredients, cook on a skillet, and serve.",
      time: "Cooking Time: 20 mins"
    },
    {
      id: 2,
      category: "Lunch",
      title: "Pasta Primavera",
      image: "pasta.jpg",
      description: "A vibrant, vegetable-packed pasta dish.",
      ingredients: ["Pasta", "Bell Peppers", "Zucchini", "Cherry Tomatoes", "Olive Oil", "Parmesan Cheese"],
      instructions: "Cook pasta until al dente. Sauté vegetables in olive oil, mix with pasta, and top with Parmesan cheese. Serve warm.",
      time: "Cooking Time: 25 mins"
    },
    {
      id: 3,
      category: "Dessert",
      title: "Chocolate Cake",
      image: "chocaletecakes.png",
      description: "Rich and moist chocolate cake.",
      ingredients: ["Flour", "Cocoa", "Sugar", "Eggs", "Butter"],
      instructions: "Bake ingredients and serve with frosting.",
      time: "Cooking Time: 45 mins"
    }
  ];
  
  // Display Recipes
  const recipeList = document.getElementById("recipe-list");
  
  function displayRecipes(recipesToDisplay) {
    recipeList.innerHTML = recipesToDisplay
      .map(
        recipe => `
        <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="info">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  }
  
  displayRecipes(recipes);
  
  // Filter Recipes by Category
  function filterByCategory(category) {
    if (category === "All") {
      displayRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe => recipe.category === category);
      displayRecipes(filtered);
    }
  }
  
  // Search Recipes
  function filterRecipes() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const filtered = recipes.filter(
      recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm)
        )
    );
    displayRecipes(filtered);
  }
  
  // Show Recipe Details
  function showRecipeDetails(id) {
    const recipe = recipes.find(recipe => recipe.id === id);
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-description").textContent =
      recipe.description;
    document.getElementById("recipe-ingredients").innerHTML = recipe.ingredients
      .map(ingredient => `<li>${ingredient}</li>`)
      .join("");
    document.getElementById("recipe-instructions").textContent =
      recipe.instructions;
    document.getElementById("recipe-time").textContent = recipe.time;
    document.getElementById("recipe-modal").style.display = "flex";
  }
  
  // Close Modal
  function closeModal() {
    document.getElementById("recipe-modal").style.display = "none";
  }
  // Toggle Add Recipe Form
function toggleRecipeForm() {
  const form = document.getElementById("add-recipe-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add New Recipe
function addNewRecipe(event) {
  event.preventDefault();

  // Get form values
  const title = document.getElementById("new-recipe-title").value;
  const category = document.getElementById("new-recipe-category").value;
  const image = document.getElementById("new-recipe-image").value;
  const description = document.getElementById("new-recipe-description").value;
  const ingredients = document
    .getElementById("new-recipe-ingredients")
    .value.split(",")
    .map(ing => ing.trim());
  const instructions = document.getElementById("new-recipe-instructions").value;
  const time = document.getElementById("new-recipe-time").value;

  // Create new recipe object
  const newRecipe = {
    id: recipes.length + 1,
    category,
    title,
    image,
    description,
    ingredients,
    instructions,
    time
  };

  // Add to recipes array
  recipes.push(newRecipe);

  // Refresh the recipes list
  displayRecipes(recipes);

  // Reset and hide form
  document.getElementById("new-recipe-form").reset();
  toggleRecipeForm();
}
