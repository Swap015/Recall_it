import qdrant from "../../config/qdrant.js";

const COLLECTION_NAME = "recallit_knowledge";

const cleanTestMemories = async () => {
  try {
    // Delete User A's test memories
    await qdrant.delete(COLLECTION_NAME, {
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: "user_123",
            },
          },
        ],
      },
    });

    // Delete User B's test memories
    await qdrant.delete(COLLECTION_NAME, {
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: "user_456",
            },
          },
        ],
      },
    });

    console.log("Test memories cleaned successfully!");
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
};

cleanTestMemories();
