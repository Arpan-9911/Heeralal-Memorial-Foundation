import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: [
        "volunteer",
        "intern",
        "fieldworker",
        "donor",
        "partner",
        "other",
      ],
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const JoinRequest = mongoose.model(
  "JoinRequest",
  joinRequestSchema
);

export default JoinRequest;
