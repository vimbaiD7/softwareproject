import React, { useEffect, useState } from "react";
import { fetchPopularRecipes } from "../api/recipes";
import { Link } from "react-router-dom";

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopular = async () => {
      const data = await fetchPopularRecipes();
      setRecipes(data);
      setLoading(false);
    };
    getPopular();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Popular Recipes</h1>
        <p className="text-lg text-gray-700">Loading popular recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">Popular Recipes</h1>
      <p className="text-lg text-gray-700 mb-6">
        Check out our most popular and trending recipes!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
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
  );
}
