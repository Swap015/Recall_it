import { randomUUID } from "node:crypto";

import qdrant from "../../config/qdrant.js";
import { generateEmbedding } from "../embeddings/embeddingService.js";

// Use the exact collection name from createCollection.js
const COLLECTION_NAME = "recallit_knowledge";

// Save a new memory in Qdrant
export const saveMemory = async (
  text,
  userId,
  topic = "General",
  sourceType = "note",
) => {
  try {
    // Step 1: Generate embedding
    const vector = await generateEmbedding(text);

    // Step 2: Generate unique ID
    const id = randomUUID();

    // Step 3: Save vector and metadata in Qdrant
    await qdrant.upsert(COLLECTION_NAME, {
      points: [
        {
          id,
          vector,
          payload: {
            userId,
            text,
            topic,
            sourceType,
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
  try {
    const result = await qdrant.retrieve(COLLECTION_NAME, {
      ids: [id],
      with_payload: true,
      with_vector: false,
    });

    return result;
  } catch (error) {
    console.error("Error retrieving memory:", error);
    throw error;
  }
};

// Search memories belonging to a particular user
export const searchMemories = async (query, userId) => {
  try {
    // Step 1: Convert question into embedding
    const queryVector = await generateEmbedding(query);

    // Step 2: Search only this user's memories
    const response = await qdrant.query(COLLECTION_NAME, {
      query: queryVector,
      limit: 3,

      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId,
            },
          },
        ],
      },

      with_payload: true,
      with_vector: false,
    });

    // Step 3: Return matching memories
    return response.points.map((result) => ({
      id: result.id,
      score: result.score,
      userId: result.payload.userId,
      text: result.payload.text,
      topic: result.payload.topic,
      sourceType: result.payload.sourceType,
      createdAt: result.payload.createdAt,
    }));
  } catch (error) {
    console.error("Semantic search failed:", error);
    throw error;
  }
};
