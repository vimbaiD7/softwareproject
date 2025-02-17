import mongoose from "mongoose";  
import express from "express";
import Recipe from "../models/Recipe.js";  
import jwt from "jsonwebtoken";

const router = express.Router();


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});



router.get("/my-recipes", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); 
    const recipes = await Recipe.find({ user: userId });

    if (!recipes.length) {
      return res.status(404).json({ error: "No recipes found for this user" });
    }

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ error: "Error fetching user recipes" });
  }
});



router.post("/", authMiddleware, async (req, res) => {
  console.log("User ID from token:", req.user.id); 

  const { title, ingredients, instructions, image } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image: image || "",
      user: req.user.id,  
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Error adding recipe" });
  }
});


export default router;
