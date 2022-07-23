import mongoose from "mongoose";

export default async function connectToMongo() {
  try {
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected!!");
    return connection;
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}