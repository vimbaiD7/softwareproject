import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../api/recipes";
import DropdownFilter from "../components/DropdownFilter";
import SuggestiveSearch from "../components/SuggestiveSearch";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

  // Called when user selects or types a query
  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await fetchRecipes(query);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (selectedOption) => {
    setCategory(selectedOption);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          🍽️ Search Recipes
        </h2>

        <div className="flex items-start gap-4 mb-6">
          <DropdownFilter
            label="Select Category"
            options={categories}
            onSelect={handleCategorySelect}
          />
          <SuggestiveSearch onSearch={handleSearch} />
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{recipe.title}</h3>
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block font-medium"
              >
                View Recipe →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
