import { pipeline } from "@huggingface/transformers";

let embeddingPipeline = null;

// Load the model only once
const getEmbeddingPipeline = async () => {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
  }

  return embeddingPipeline;
};

// Convert text into a vector
export const generateEmbedding = async (text) => {
  const extractor = await getEmbeddingPipeline();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};
