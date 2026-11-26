import qdrant from "./qdrant.js";

const COLLECTION_NAME = "recallit_knowledge";

export const createRecallItCollection = async () => {
  try {
    // Check whether collection already exists
    const collections = await qdrant.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === COLLECTION_NAME,
    );

    if (exists) {
      console.log("RecallIt collection already exists.");
      return;
    }

    // Create collection
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 384,
        distance: "Cosine",
      },
    });

    console.log("RecallIt collection created successfully!");
  } catch (error) {
    console.error("Collection creation failed:", error.message);
    throw error;
  }
};
