import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";       
import Home from "./pages/Home";                
import PopularRecipes from "./pages/PopularRecipes";  
import RecipeDetails from "./pages/RecipeDetails";    
import SignIn from "./pages/SignIn";              
import SignUp from "./pages/SignUp";              
import RecipeList from "./pages/RecipeList";
import Dashboard from "./pages/Dashboard";
import MyRecipes from "./pages/MyRecipe";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-orange-100 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<RecipeList />} />
          <Route path="/popular" element={<PopularRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/my-recipes" element={<MyRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;