import express from "express";

import { createMemory, searchMemory } from "../controllers/memoryController.js";

const router = express.Router();

// Create a memory
router.post("/", createMemory);

// Search memories
router.post("/search", searchMemory);

export default router;
