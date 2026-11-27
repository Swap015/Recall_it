import { saveMemory, searchMemories } from "../services/memoryService.js";

// POST: Create a new memory
export const createMemory = async (req, res) => {
  try {
    const { text, topic, sourceType } = req.body;

    // Validate input
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Memory text is required.",
      });
    }

    // Temporary user ID for development.
    // Later, authentication middleware will provide the real user ID.
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Save memory using our service
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

// POST: Search existing memories
export const searchMemory = async (req, res) => {
  try {
    const { query, userId } = req.body;

    // Validate input
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Search memories using our service
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
