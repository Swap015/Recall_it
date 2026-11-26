import { randomUUID } from "node:crypto";

import qdrant from "../../config/qdrant.js";
import { generateEmbedding } from "../embeddings/embeddingService.js";

// IMPORTANT: Use the exact collection name from createCollection.js
const COLLECTION_NAME = "recallit_knowledge";

export const saveMemory = async (text) => {
  try {
    // Step 1: Generate embedding
    const vector = await generateEmbedding(text);

    // Step 2: Create a unique ID
    const id = randomUUID();

    // Step 3: Store vector and payload in Qdrant
    await qdrant.upsert(COLLECTION_NAME, {
      points: [
        {
          id,
          vector,
          payload: {
            text,
            topic: "React",
            sourceType: "note",
            createdAt: new Date().toISOString(),
          },
        },
      ],
    });

    console.log("Memory saved successfully!");

    return id;
  } catch (error) {
    console.error("Error saving memory:", error);
    throw error;
  }
};

// Retrieve a stored memory using its ID
export const getMemoryById = async (id) => {
  const result = await qdrant.retrieve(COLLECTION_NAME, {
    ids: [id],
    with_payload: true,
    with_vector: false,
  });

  return result;
};
