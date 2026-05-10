import mongoose from "mongoose";

const heroSlideSchema =
  new mongoose.Schema(
    {
      title: {
        en: {
          type: String,
          required: true,
        },

        hi: {
          type: String,
          default: "",
        },
      },

      subtitle: {
        en: {
          type: String,
          default: "",
        },

        hi: {
          type: String,
          default: "",
        },
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

const HeroSlide =
  mongoose.model(
    "HeroSlide",
    heroSlideSchema
  );

export default HeroSlide;