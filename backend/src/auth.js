import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api"; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); 
      console.log("✅ Token saved:", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};
