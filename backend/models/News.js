// models/news.model.js

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      default: "Press Release",
    },

    date: {
      type: String,
    },

    title: {
      en: String,
      hi: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("News", newsSchema);
