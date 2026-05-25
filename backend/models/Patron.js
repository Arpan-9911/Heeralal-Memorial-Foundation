import mongoose from "mongoose";

const patronSchema = new mongoose.Schema(
  {
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
      en: {
        type: String,
        required: true,
      },
      hi: {
        type: String,
        required: true,
      },
    },

    quote: {
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

export default mongoose.model("Patron", patronSchema);
