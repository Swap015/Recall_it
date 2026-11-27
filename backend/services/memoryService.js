import { randomUUID } from "node:crypto";
import Memory from "../models/Memory.js";
import { generateEmbedding } from "../ai/embeddings/embeddingService.js";
import qdrant from "../config/qdrant.js";

const COLLECTION_NAME = "recallit_knowledge";

export const saveMemory = async (
  text,
  userId,
  topic = "General",
  sourceType = "note",
) => {
  let memory = null;

  try {
    // 1. Generate a unique Qdrant ID
    const qdrantPointId = randomUUID();

    // 2. Save original memory in MongoDB
    memory = await Memory.create({
      userId,
      text,
      topic,
      sourceType,
      qdrantPointId,
    });

    console.log("Memory saved in MongoDB!");

    // 3. Generate embedding
    const vector = await generateEmbedding(text);

    // 4. Save vector in Qdrant
    await qdrant.upsert(COLLECTION_NAME, {
      points: [
        {
          id: qdrantPointId,
          vector,
          payload: {
            userId: userId.toString(),
            mongoMemoryId: memory._id.toString(),
            text,
            topic,
            sourceType,
            createdAt: memory.createdAt.toISOString(),
          },
        },
      ],
    });

    console.log("Memory saved in Qdrant!");

    // 5. Return saved MongoDB document
    return memory;
  } catch (error) {
    // 6. Rollback MongoDB if a later operation fails
    if (memory) {
      await Memory.findByIdAndDelete(memory._id);
      console.log("MongoDB memory rolled back.");
    }

    console.error("Error saving memory:", error);
    throw error;
  }
};

export const searchMemories = async (query, userId) => {
  try {
    // 1. Convert the user's question into an embedding
    const queryVector = await generateEmbedding(query);

    // 2. Search Qdrant for similar vectors
    const response = await qdrant.query(COLLECTION_NAME, {
      query: queryVector,
      limit: 5,

      // Only search this user's memories
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId.toString(),
            },
          },
        ],
      },

      with_payload: true,
      with_vector: false,
    });

    // 3. Get matching Qdrant points
    const points = response.points;

    if (points.length === 0) {
      return [];
    }

    // 4. Extract Qdrant point IDs
    const pointIds = points.map((point) => point.id);

    // 5. Find the complete memory records in MongoDB
    const memories = await Memory.find({
      userId,
      qdrantPointId: { $in: pointIds },
    });

    // 6. Create a lookup map
    const memoryMap = new Map(
      memories.map((memory) => [memory.qdrantPointId, memory]),
    );

    // 7. Return MongoDB records in Qdrant similarity order
    return points
      .map((point) => ({
        score: point.score,
        memory: memoryMap.get(point.id),
      }))
      .filter((result) => result.memory);
  } catch (error) {
    console.error("Memory search failed:", error);
    throw error;
  }
};
