import express from "express";

import { createMemory, searchMemory } from "../controllers/memoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a memory
router.post("/", authMiddleware, createMemory);

// Search memories
router.post("/search", authMiddleware, searchMemory);

export default router;
