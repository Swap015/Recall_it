import "dotenv/config";
import mongoose from "mongoose";

import { saveMemory, searchMemories } from "./services/memoryService.js";

const testMemory = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");

    const userId = new mongoose.Types.ObjectId();

    // Save one memory
    const memory = await saveMemory(
      "React components help us build reusable interfaces.",
      userId,
      "React",
      "note",
    );

    console.log("\nMemory saved successfully!");
    console.log("MongoDB ID:", memory._id);
    console.log("Qdrant ID:", memory.qdrantPointId);

    // Search memories
    const results = await searchMemories(
      "How do React components work?",
      userId,
    );

    console.log("\nSearch results:");

    results.forEach((result, index) => {
      console.log(`\nResult ${index + 1}`);
      console.log("Score:", result.score);
      console.log("Text:", result.memory.text);
      console.log("Topic:", result.memory.topic);
    });
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected!");
  }
};

testMemory();
