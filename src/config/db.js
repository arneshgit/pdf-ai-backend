import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;


let client;
let db;

export async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(); // uses db name from URI

    console.log("✅ MongoDB connected");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
