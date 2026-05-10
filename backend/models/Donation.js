import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
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

    amount: {
      type: String,
      required: true,
      trim: true,
    },

    utrNumber: {
      type: String,
      required: true,
      trim: true,
    },

    paymentMode: {
      type: String,
      enum: ["upi", "bank_transfer", "other"],
      default: "upi",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model(
  "Donation",
  donationSchema
);

export default Donation;
