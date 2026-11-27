import "dotenv/config";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import Memory from "./models/Memory.js";

const testMemory = async () => {
  try {
    // Step 1: Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected!");

    // Temporary user ID for testing.
    // Later, authentication will provide the real user ID.
    const userId = new mongoose.Types.ObjectId();

    // Step 2: Create a memory
    const memory = await Memory.create({
      userId,
      text: "React components help us build reusable interfaces.",
      topic: "React",
      sourceType: "note",
      qdrantPointId: randomUUID(),
    });

    console.log("\nMemory saved in MongoDB!");

    // Step 3: Retrieve the saved memory
    const savedMemory = await Memory.findById(memory._id);

    console.log("\nRetrieved memory:");
    console.log(savedMemory);
  } catch (error) {
    console.error("MongoDB memory test failed:", error);
  } finally {
    // Step 4: Close MongoDB connection
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected!");
  }
};

testMemory();
