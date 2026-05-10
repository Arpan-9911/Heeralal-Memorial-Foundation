import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const mediaSchema = new mongoose.Schema(
  {
    images: [imageSchema],

    video: {
      file: {
        type: String,
        default: "",
      },

      caption: {
        en: {
          type: String,
          default: "",
        },

        hi: {
          type: String,
          default: "",
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "MediaGallery",
  mediaSchema
);