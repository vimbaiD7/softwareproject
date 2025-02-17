import React, { useState } from "react";

export default function MyRecipe() {
  const [recipes, setRecipes] = useState([
    {
      _id: "1",
      title: "Spaghetti Bolognese",
      ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Garlic"],
      instructions: "Cook spaghetti, prepare sauce, and mix together.",
      image: "https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg?resize=900%2C1260&zoom=0.86", 
    },
    {
      _id: "2",
      title: "Chicken Stir Fry",
      ingredients: ["Chicken", "Bell Peppers", "Soy Sauce", "Onions"],
      instructions: "Stir-fry chicken with vegetables and soy sauce.",
      image: "https://www.saltandlavender.com/wp-content/uploads/2022/03/chicken-stir-fry-1-1024x1536.jpg",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">🍽️ My Recipes</h1>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white p-4 rounded-md shadow-md">
                {recipe.image && (
                  <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-2" />
                )}
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                <p className="text-gray-600"><strong>Instructions:</strong> {recipe.instructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recipes found. Start adding your own!</p>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// export default function MyRecipe() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchMyRecipes();
//   }, []);

//   const fetchMyRecipes = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${API_BASE_URL}/recipes/my-recipes`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRecipes(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching user recipes:", err);
//       setError("Failed to fetch recipes. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-orange-600 mb-4">🍽️ My Recipes</h1>

//         {loading ? (
//           <p className="text-gray-600">Loading recipes...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : recipes.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {recipes.map((recipe) => (
//               <div key={recipe._id} className="bg-white p-4 rounded-md shadow-md">
//                 {recipe.image && (
//                   <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-2" />
//                 )}
//                 <h3 className="text-xl font-semibold">{recipe.title}</h3>
//                 <p className="text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients}</p>
//                 <p className="text-gray-600"><strong>Instructions:</strong> {recipe.instructions}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No recipes found. Start adding your own!</p>
//         )}
//       </div>
//     </div>
//   );
// }
