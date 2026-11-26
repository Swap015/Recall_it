import { saveMemory, getMemoryById } from "./qdrantService.js";

const main = async () => {
  const text = "React components help us build reusable interfaces.";

  // Save memory
  const id = await saveMemory(text);

  console.log("Saved memory ID:", id);

  // Retrieve memory
  const result = await getMemoryById(id);

  console.log("Retrieved memory:");
  console.log(result);
};

main().catch(console.error);
