import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    general: [
      {
        key: { type: String, required: true },
        label: { type: String },
        value: { type: String },
      },
    ],
    registration: [
      {
        key: { type: String, required: true },
        label: { type: String },
        value: { type: String },
      },
    ],
    contact: [
      {
        key: { type: String, required: true },
        label: { type: String },
        value: { type: String },
      },
    ],
    executionLayout: {
      type: [Number],
      default: [3],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
