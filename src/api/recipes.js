import axios from "axios";

const API_KEY = "2980e1638994447f804169675a2b425f"; 
const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (query = "chicken") => { 
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        query,
        apiKey: API_KEY,
        number: 10, // Fetch recipes
      },
    });

    console.log("Fetched recipes:", response.data.results); 
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error.response?.data || error.message);
    return [];
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });

    console.log("Fetched recipe details:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error.response?.data || error.message);
    return null;
  }
};

export const fetchPopularRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        number: 20, // Fetch popular recipes
        sort: "popularity",
      },
    });

    console.log("Fetched popular recipes:", response.data.results); 
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular recipes:", error.response?.data || error.message);
    return [];
  }
};

