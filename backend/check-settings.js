import mongoose from "mongoose";
import dotenv from "dotenv";
import Settings from "./models/Settings.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    const settings = await Settings.findOne();
    console.log("Current Settings in DB:", JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
