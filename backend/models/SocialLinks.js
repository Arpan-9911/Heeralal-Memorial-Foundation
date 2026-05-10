import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
  {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const SocialLinks = mongoose.model("SocialLinks", socialLinksSchema);

export default SocialLinks;
