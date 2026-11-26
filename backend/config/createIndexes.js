import qdrant from "./qdrant.js";

const COLLECTION_NAME = "recallit_knowledge";

export const createRecallItIndexes = async () => {
  const indexes = [
    { field: "userId", type: "keyword" },
    { field: "documentId", type: "keyword" },
    { field: "topic", type: "keyword" },
    { field: "sourceType", type: "keyword" },
    { field: "createdAt", type: "datetime" },
  ];

  for (const index of indexes) {
    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: index.field,
      field_schema: index.type,
    });
  }

  console.log("RecallIt payload indexes created!");
};
