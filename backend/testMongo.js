import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function testConnection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connection Successful!");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

testConnection();
