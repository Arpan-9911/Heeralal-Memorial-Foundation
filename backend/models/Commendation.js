import mongoose from "mongoose";

const commendationSchema = new mongoose.Schema(
  {
    directorPhoto: {
      type: String,
      default: "",
    },

    letterImage: {
      type: String,
      default: "",
    },

    messageTitle: {
      en: { type: String, default: "Message of Hope" },
      hi: { type: String, default: "आशा का संदेश" },
    },

    messageBody: {
      en: { type: String, default: "" },
      hi: { type: String, default: "" },
    },

    directorName: {
      en: { type: String, default: "Dr. Arpan Kumar" },
      hi: { type: String, default: "डॉ. अर्पन कुमार" },
    },

    directorPost: {
      en: {
        type: String,
        default: "Director, Heeralal Memorial Foundation",
      },
      hi: {
        type: String,
        default: "निदेशक, हीरालाल मेमोरियल फाउंडेशन",
      },
    },

    sectionSubtitle: {
      en: { type: String, default: "Institutional Patronage" },
      hi: { type: String, default: "संस्थागत संरक्षण" },
    },

    sectionTitle: {
      en: { type: String, default: "Formal Commendation" },
      hi: { type: String, default: "औपचारिक प्रशंसा" },
    },
  },
  {
    timestamps: true,
  }
);

const Commendation = mongoose.model(
  "Commendation",
  commendationSchema
);

export default Commendation;
