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
    memoryLine: {
      en: { type: String, default: "In the memory of Late Heeralal Yadav Ji" },
      hi: { type: String, default: "स्वर्गीय हीरालाल यादव जी की स्मृति में" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SacredMemory", sacredMemorySchema);
