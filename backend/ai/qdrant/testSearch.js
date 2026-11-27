import { saveMemory, searchMemories } from "./qdrantService.js";

const main = async () => {
  const userA = "user_123";
  const userB = "user_456";

  // User A memories
  await saveMemory(
    "React components help us build reusable interfaces.",
    userA,
    "React",
    "note",
  );

  await saveMemory(
    "JavaScript promises handle asynchronous operations.",
    userA,
    "JavaScript",
    "note",
  );

  // User B memory
  await saveMemory(
    "Python is used for machine learning and data science.",
    userB,
    "Machine Learning",
    "note",
  );

  console.log("\n--- User A Search ---");

  const userAResults = await searchMemories(
    "How do I build reusable UI?",
    userA,
  );

  console.log(JSON.stringify(userAResults, null, 2));

  console.log("\n--- User B Search ---");

  const userBResults = await searchMemories(
    "What language can I use for machine learning?",
    userB,
  );

  console.log(JSON.stringify(userBResults, null, 2));
};

main().catch(console.error);
