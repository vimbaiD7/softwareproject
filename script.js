document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipeForm");
    const recipesDiv = document.getElementById("recipes");
    const favoriteRecipesDiv = document.getElementById("favorite-recipes");

    const modal = document.getElementById("recipeModal");
    const modalRecipeName = document.getElementById("modalRecipeName");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const closeModal = document.querySelector(".close");

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    function displayRecipes() {
        recipesDiv.innerHTML = "";
        favoriteRecipesDiv.innerHTML = "";

        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                <h3>${recipe.name}</h3>
                <button onclick="viewRecipe(${index})">View</button>
            `;
            recipesDiv.appendChild(recipeCard);

            const favoriteShortcut = document.createElement("a");
            favoriteShortcut.href = "#";
            favoriteShortcut.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="favorite-image"> ${recipe.name}
            `;
            favoriteShortcut.onclick = () => viewRecipe(index);
            favoriteRecipesDiv.appendChild(favoriteShortcut);
        });
    }

    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("recipeName").value.trim();
        const ingredients = document.getElementById("recipeIngredients").value.trim().split(",");
        const instructions = document.getElementById("recipeInstructions").value.trim();
        const imageFile = document.getElementById("recipeImage").files[0];

        if (!imageFile) {
            alert("Please select an image for the recipe.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageBase64 = event.target.result;

            recipes.push({ name, ingredients, instructions, image: imageBase64 });
            localStorage.setItem("recipes", JSON.stringify(recipes));
            displayRecipes();
            recipeForm.reset();
        };

        reader.readAsDataURL(imageFile);
    });

    window.viewRecipe = function (index) {
        const recipe = recipes[index];
        modalRecipeName.textContent = recipe.name;
        modalIngredients.innerHTML = recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("");
        modalInstructions.textContent = recipe.instructions;
        modal.style.display = "block";

        document.getElementById("addToShoppingList").onclick = () => {
            const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
            shoppingList.push(...recipe.ingredients);
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            alert("Ingredients added to shopping list!");
        };
    };

    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    displayRecipes();
});
///////////////////////////////////////////////

let result = document.getElementById("result");
let searchBtn = document.getElementById("searchBtn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("userInput").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          if (i.startsWith("strIngredient") && myMeal[i]) {
            let ingredient = myMeal[i];
            let measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        result.innerHTML = `
          <img src=${myMeal.strMealThumb}>
          <div class="details">
              <h2>${myMeal.strMeal}</h2>
              <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredient-con"></div>
          <div id="recipe">
              <button id="hide-recipe">X</button>
              <pre id="instructions">${myMeal.strInstructions}</pre>
          </div>
          <button id="show-recipe">View Recipe</button>
        `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>No recipes found for "${userInp}"</h3>`;
      });
  }
});

//////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const shoppingListBtn = document.getElementById("viewShoppingList"); 
    const shoppingListContainer = document.getElementById("shopping-list-container"); 
    const recipesContainer = document.getElementById("recipes-container"); 
    const shoppingList = document.getElementById("shoppingList"); 
    const clearShoppingListBtn = document.getElementById("clearShoppingList"); 


    shoppingListBtn.addEventListener("click", () => {
        shoppingListContainer.style.display = "block";
        recipesContainer.style.display = "none"; 
        displayShoppingList(); 
        console.log("Ingredients saved to shopping list:", shoppingList);

    });


    function displayShoppingList() {
        const items = JSON.parse(localStorage.getItem("shoppingList")) || []; 
        shoppingList.innerHTML = "";

        if (items.length === 0) {
            shoppingList.innerHTML = "<li>Your shopping list is empty!</li>"; 
        } else {
            items.forEach((item, index) => {
                const li = document.createElement("li");
                li.textContent = item;
                console.log("Displaying shopping list:", items);


                
                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.style.marginLeft = "10px";
                removeBtn.addEventListener("click", () => {
                    removeItemFromShoppingList(index); 
                });

                li.appendChild(removeBtn);
                shoppingList.appendChild(li); 
            });
        }
    }

    function removeItemFromShoppingList(index) {
        const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
        items.splice(index, 1); 
        localStorage.setItem("shoppingList", JSON.stringify(items));
        displayShoppingList(); 
    }

   
    clearShoppingListBtn.addEventListener("click", () => {
        localStorage.setItem("shoppingList", JSON.stringify([])); 
        displayShoppingList(); 
    });

    window.addToShoppingList = function (ingredients) {
        const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        shoppingList.push(...ingredients); 
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList)); 
        alert("Ingredients added to shopping list!");
    };


    document.getElementById("addToShoppingList").onclick = () => {
        const recipeIngredients = modalIngredients.textContent.split("\n").filter((item) => item.trim() !== "");
        addToShoppingList(recipeIngredients);
    };
});
