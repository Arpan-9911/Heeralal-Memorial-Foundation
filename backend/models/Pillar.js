import mongoose from "mongoose";

const pillarSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: "📚",
    },

    title: {
      en: {
        type: String,
        required: true,
      },
      hi: {
        type: String,
        required: true,
      },
    },

    desc: {
      en: {
        type: String,
        required: true,
      },
      hi: {
        type: String,
        required: true,
      },
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pillar", pillarSchema);
