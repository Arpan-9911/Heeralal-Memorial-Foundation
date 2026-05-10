import mongoose from "mongoose";

const programSchema =
  new mongoose.Schema(
    {
      category: {
        en: String,
        hi: String,
      },

      name: {
        en: String,
        hi: String,
      },

      description: {
        en: String,
        hi: String,
      },

      image: {
        type: String,
        required: true,
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

export default mongoose.model(
  "Program",
  programSchema
);