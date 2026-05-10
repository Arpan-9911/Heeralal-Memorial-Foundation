import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
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

    description: {
      en: String,

      hi: String,
    },

    presentedBy: {
      en: String,

      hi: String,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Achievement",
  achievementSchema
);