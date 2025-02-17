import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../api/recipes";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeDetails(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Title & Image */}
        <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full mt-4 rounded-lg object-cover"
          />
        )}

        <div className="mt-4 text-gray-700">
          <p>
            <strong>Prep Time:</strong>{" "}
            {recipe.preparationMinutes ? `${recipe.preparationMinutes} minutes` : "N/A"}
          </p>
          <p>
            <strong>Cook Time:</strong>{" "}
            {recipe.cookingMinutes ? `${recipe.cookingMinutes} minutes` : "N/A"}
          </p>
          <p>
            <strong>Servings:</strong>{" "}
            {recipe.servings ? recipe.servings : "N/A"}
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-6">Ingredients</h3>
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No ingredients data found.</p>
        )}

        <h3 className="text-2xl font-bold mt-6">Instructions</h3>
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          recipe.analyzedInstructions.map((inst, idx) => (
            <div key={idx} className="mt-2">
              {recipe.analyzedInstructions.length > 1 && (
                <h4 className="text-lg font-semibold">
                  Instruction Set {idx + 1}
                </h4>
              )}
              <ol className="list-decimal list-inside mt-1 text-gray-700">
                {inst.steps.map((step) => (
                  <li key={step.number} className="mb-2">
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
          ))
        ) : (

          <p
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        )}
      </div>
    </div>
  );
}
