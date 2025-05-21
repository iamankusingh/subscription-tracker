import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

// connect to database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to db in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("error connecting database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
