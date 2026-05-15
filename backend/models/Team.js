import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
      enum: [
        "founder",
        "leader",
        "execution",
      ],
      required: true,
    },

    name: {
      en: {
        type: String,
        required: true,
      },

      hi: {
        type: String,
        required: true,
      },
    },

    role: {
      en: String,
      hi: String,
    },

    quote: {
      en: String,
      hi: String,
    },

    shortDescription: {
      en: String,
      hi: String,
    },

    message: {
      en: String,
      hi: String,
    },

    displayName: {
      en: String,
      hi: String,
    },

    displayDesignation: {
      en: String,
      hi: String,
    },

    photo: {
      type: String,
      required: true,
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

export default mongoose.model(
  "Team",
  teamSchema
);