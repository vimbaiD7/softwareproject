import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String }, // Optional image URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to user
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
