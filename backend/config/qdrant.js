import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";
dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_CLUSTER,
  apiKey: process.env.QDRANT_API_KEY,
  checkCompatibility: false,
});

export default qdrant;
