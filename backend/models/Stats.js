// models/stats.model.js

import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: "📊",
    },

    value: {
      type: String,
      required: true,
    },

    label: {
      en: {
        type: String,
        required: true,
      },

      hi: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Stats", statsSchema);
