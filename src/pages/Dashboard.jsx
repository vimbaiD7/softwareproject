import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]); 
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/signin"); 
    } else {
      setUser(storedUser);
      fetchUserRecipes();
    }
  }, []);


  const fetchUserRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/recipes/my-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserRecipes(response.data);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!title || !ingredients || !instructions) return alert("All fields required!");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/recipes`,
        { title, ingredients, instructions, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Recipe added!");
      fetchUserRecipes(); 
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage("");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600">🍽️ Dashboard</h1>
          <div>
            <span className="text-gray-700 mr-4">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-4">📌 Your Recipes</h2>
        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-600">🍏 {recipe.ingredients}</p>
                <p className="text-gray-600">{recipe.instructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Now, you can add your own recipes!</p>
        )}

        <button
          onClick={() => navigate("/my-recipes")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Your Recipes
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">🌍 All Recipes</h2>
        <p className="text-gray-600">
          Want to explore more? Check out the most popular recipes!
        </p>
        <button
          onClick={() => navigate("/explore")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View All Recipes
        </button>

        <div className="mt-8 p-6 border-t">
          <h2 className="text-2xl font-bold text-gray-700">Add a New Recipe</h2>
          <form onSubmit={handleAddRecipe} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
