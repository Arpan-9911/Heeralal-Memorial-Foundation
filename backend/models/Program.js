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

      longDescription: {
        en: String,
        hi: String,
      },

      location: {
        en: String,
        hi: String,
      },

      centres: {
        en: String,
        hi: String,
      },

      centresList: [
        {
          name: {
            en: String,
            hi: String,
          },
          location: {
            en: String,
            hi: String,
          },
          image: {
            type: String,
            default: "",
          },
        },
      ],

      image: {
        type: String,
        required: true,
      },

      active: {
        type: Boolean,
        default: true,
      },

      serialNumber: {
        type: Number,
        default: 0,
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