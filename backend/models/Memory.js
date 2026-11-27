import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      default: "General",
    },

    sourceType: {
      type: String,
      enum: ["note", "pdf", "youtube", "text"],
      default: "note",
    },

    qdrantPointId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Memory = mongoose.model("Memory", memorySchema);

export default Memory;
