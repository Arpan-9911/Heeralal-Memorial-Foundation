import mongoose from "mongoose";

const bilingualText = (enDefault = "", hiDefault = "") => ({
  en: { type: String, default: enDefault },
  hi: { type: String, default: hiDefault },
});

const aboutUsSchema = new mongoose.Schema(
  {
    /* ────── TAB 1: Institutional Legacy ────── */
    legacy: {
      title: bilingualText("Our Institutional Roots", "हमारी संस्थागत जड़ें"),
      paragraphs: [
        {
          en: { type: String, default: "" },
          hi: { type: String, default: "" },
        },
      ],
      images: [{ type: String }], // filenames in uploads/about
    },

    /* ────── TAB 2: Vision & Mission ────── */
    vision: {
      subtitle: bilingualText("Our Ultimate Goal", "हमारा परम लक्ष्य"),
      title: bilingualText("Vision Statement", "दृष्टि वक्तव्य"),
      quote: bilingualText("", ""),
      missionTitle: bilingualText("Our Mission", "हमारा मिशन"),
      missionDesc: bilingualText("", ""),
      objectiveTitle: bilingualText("Core Objective", "मूल उद्देश्य"),
      objectiveDesc: bilingualText("", ""),
      image: { type: String, default: "" },
    },

    /* ────── TAB 3: Core Values ────── */
    coreValues: [
      {
        icon: { type: String, default: "🏛️" },
        title: bilingualText("", ""),
        desc: bilingualText("", ""),
      },
    ],

    /* ────── TAB 4: Governance ────── */
    governance: {
      title: bilingualText("Governance Structure", "शासन संरचना"),
      description: bilingualText("", ""),
      rows: [
        {
          body: bilingualText("", ""),
          frequency: bilingualText("", ""),
          responsibility: bilingualText("", ""),
        },
      ],
    },

    /* ────── TAB 5: Compliance & Audit ────── */
    compliance: {
      title: bilingualText("Regulatory Compliance", "नियामक अनुपालन"),
      description: bilingualText("", ""),
      items: [
        {
          en: { type: String, default: "" },
          hi: { type: String, default: "" },
        },
      ],
      cards: [
        {
          title: bilingualText("", ""),
          desc: bilingualText("", ""),
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

export default AboutUs;
