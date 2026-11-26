import { saveMemory, searchMemories } from "./qdrantService.js";

const main = async () => {
  // Save three sample memories
  await saveMemory("React components help us build reusable interfaces.");

  await saveMemory("JavaScript promises handle asynchronous operations.");

  await saveMemory("MongoDB stores information in collections and documents.");

  console.log("\nAll memories saved!");

  // Search using different wording
  const results = await searchMemories(
    "How can I create reusable UI elements?",
  );

  console.log("\nSemantic search results:");

  console.log(JSON.stringify(results, null, 2));
};

main().catch(console.error);
