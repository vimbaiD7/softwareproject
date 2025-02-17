import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api"; 

export const fetchMyRecipes = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found. User is not logged in.");
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/recipes/my-recipes`, {
      headers: { Authorization: `Bearer ${token}` }, 
    });

    console.log("✅ Fetched user recipes:", response.data); 
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching my recipes:", error);
    return [];
  }
};
