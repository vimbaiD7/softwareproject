import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};


// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
