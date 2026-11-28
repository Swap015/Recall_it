import express from "express";

import {
  createMemory,
  getAllMemories,
  removeMemory,
  searchMemory,
} from "../controllers/memoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMemory);

router.get("/", authMiddleware, getAllMemories);

router.post("/search", authMiddleware, searchMemory);

router.delete("/:id", authMiddleware, removeMemory);

export default router;
