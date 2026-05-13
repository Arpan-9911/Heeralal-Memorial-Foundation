import mongoose from "mongoose";

const sacredMemorySchema = new mongoose.Schema(
  {
    heading: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    lifespan: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SacredMemory", sacredMemorySchema);
