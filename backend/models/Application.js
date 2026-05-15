import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ["volunteer", "skill_development", "membership"],
      required: true,
    },

    name: { type: String, required: true, trim: true },
    aadharNo: { type: String, default: "", trim: true },
    dob: { type: String, default: "" },        // membership only
    address: { type: String, default: "", trim: true },
    mobileNo: { type: String, required: true, trim: true },
    emailId: { type: String, default: "", trim: true },
    occupation: { type: String, default: "", trim: true },
    reference: { type: String, default: "", trim: true },
    department: { type: String, default: "", trim: true },
    membershipFees: { type: String, default: "" },  // membership only

    photo: { type: String, default: "" },

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

export default mongoose.model("Application", applicationSchema);
