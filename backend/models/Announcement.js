import mongoose from "mongoose";

const announcementSchema =
  new mongoose.Schema(
    {
      type: {
        type: String,

        enum: [
          "event",
          "press_release",
        ],

        default: "event",
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

      excerpt: {
        en: {
          type: String,
          required: true,
        },

        hi: {
          type: String,
          required: true,
        },
      },

      date: {
        type: Date,
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
  "Announcement",
  announcementSchema
);