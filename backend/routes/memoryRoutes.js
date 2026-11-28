import express from "express";

import {
  createMemory,
  getAllMemories,
  searchMemory,
} from "../controllers/memoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a memory
router.post("/", authMiddleware, createMemory);

// Fetch all memories
router.get("/", authMiddleware, getAllMemories);

// Search memories
router.post("/search", authMiddleware, searchMemory);

export default router;
