import { saveMemory, searchMemories } from "../services/memoryService.js";
import Memory from "../models/Memory.js";

// POST: Create a new memory
export const createMemory = async (req, res) => {
  try {
    const { text, topic, sourceType } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Memory text must be a non-empty string.",
      });
    }

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const memory = await saveMemory(text, userId, topic, sourceType);

    return res.status(201).json({
      success: true,
      message: "Memory created successfully!",
      data: memory,
    });
  } catch (error) {
    console.error("Create memory error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create memory.",
    });
  }
};

// GET: Fetch all memories belonging to logged-in user
export const getAllMemories = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const memories = await Memory.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Memories fetched successfully!",
      count: memories.length,
      data: memories,
    });
  } catch (error) {
    console.error("Get memories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch memories.",
    });
  }
};

// POST: Search existing memories
export const searchMemory = async (req, res) => {
  try {
    const { query } = req.body;
    const userId = req.user.userId;

    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query must be a non-empty string.",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const results = await searchMemories(query, userId);

    return res.status(200).json({
      success: true,
      message: "Memory search completed!",
      results,
    });
  } catch (error) {
    console.error("Search memory error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search memories.",
    });
  }
};
