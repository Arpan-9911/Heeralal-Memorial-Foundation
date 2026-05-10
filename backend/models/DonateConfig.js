import mongoose from "mongoose";

const donateConfigSchema = new mongoose.Schema(
  {
    qrImage: {
      type: String,
      default: "",
    },

    upiId: {
      type: String,
      default: "",
    },

    accountName: {
      type: String,
      default: "Heeralal Memorial Foundation",
    },

    bankName: {
      type: String,
      default: "State Bank of India",
    },

    accountNo: {
      type: String,
      default: "XXXXXXXXXXXX",
    },

    ifscCode: {
      type: String,
      default: "SBIN0XXXXXX",
    },

    branch: {
      type: String,
      default: "Central Delhi Branch",
    },
  },
  {
    timestamps: true,
  }
);

const DonateConfig = mongoose.model(
  "DonateConfig",
  donateConfigSchema
);

export default DonateConfig;
