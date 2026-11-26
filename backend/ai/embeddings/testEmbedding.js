import { generateEmbedding } from "./embeddingService.js";

const main = async () => {
  const text = "React components help us build reusable interfaces.";

  const vector = await generateEmbedding(text);

  console.log("Vector length:", vector.length);
  console.log("First 10 values:", vector.slice(0, 10));
};

main().catch(console.error);
