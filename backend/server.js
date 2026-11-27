import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import qdrant from "./config/qdrant.js";
import { createRecallItCollection } from "./config/createCollection.js";
import { createRecallItIndexes } from "./config/createIndexes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to RecallIt API!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Step 1: Connect MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");

    // Step 2: Connect Qdrant
    await qdrant.getCollections();
    console.log("Qdrant connected!");

    // Step 3: Create collection if needed
    await createRecallItCollection();

    // Step 4: Create payload indexes
    await createRecallItIndexes();

    // Step 5: Start Express server
    app.listen(PORT, () => {
      console.log(`RecallIt running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);

    // Close MongoDB if startup fails
    await mongoose.disconnect();

    process.exit(1);
  }
};

startServer();
