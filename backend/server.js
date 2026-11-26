import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import qdrant from "./config/qdrant.js";
import { createRecallItCollection } from "./config/createCollection.js";
import { createRecallItIndexes } from "./config/createIndexes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Recall_It API!",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Verify Qdrant connection
    await qdrant.getCollections();
    console.log("Qdrant connected!");

    // Create collection if needed
    await createRecallItCollection();

    // Create metadata indexes
    await createRecallItIndexes();

    app.listen(PORT, () => {
      console.log(`RecallIt running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
