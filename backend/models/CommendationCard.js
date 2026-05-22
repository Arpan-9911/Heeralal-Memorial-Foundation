import mongoose from "mongoose";

const commendationCardSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, default: "" },
    },

    content: {
      en: { type: String, default: "" },
      hi: { type: String, default: "" },
    },

    byName: {
      en: { type: String, default: "" },
      hi: { type: String, default: "" },
    },

    byDesignation: {
      en: { type: String, default: "" },
      hi: { type: String, default: "" },
    },

    leftPhoto: {
      type: String,
      default: "",
    },

    rightPhoto: {
      type: String,
      default: "",
    },

    serialNumber: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CommendationCard", commendationCardSchema);
