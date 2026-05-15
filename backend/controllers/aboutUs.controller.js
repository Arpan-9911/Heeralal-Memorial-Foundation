import AboutUs from "../models/AboutUs.js";
import asyncHandler from "../middleware/asyncHandler.js";

// GET — fetch the singleton about-us document (public)
export const getAboutUs = asyncHandler(async (req, res) => {
  let doc = await AboutUs.findOne();

  if (!doc) {
    doc = await AboutUs.create({});
  }

  res.json({
    success: true,
    aboutUs: doc,
  });
});

// PUT — update the about-us page (admin only)
export const updateAboutUs = asyncHandler(async (req, res) => {
  let doc = await AboutUs.findOne();

  if (!doc) {
    doc = await AboutUs.create({});
  }

  const body = req.body;

  /* ────── TAB 1: Legacy ────── */
  if (body.legacyTitleEn !== undefined) doc.legacy.title.en = body.legacyTitleEn;
  if (body.legacyTitleHi !== undefined) doc.legacy.title.hi = body.legacyTitleHi;

  // Paragraphs come as JSON array strings
  if (body.legacyParagraphs !== undefined) {
    try {
      doc.legacy.paragraphs = JSON.parse(body.legacyParagraphs);
    } catch (e) {
      // If not JSON, ignore
    }
  }

  // Handle legacy images — keep existing ones unless new ones uploaded
  if (req.files?.legacyImages?.length) {
    // Append new uploaded filenames to existing
    const newFiles = req.files.legacyImages.map((f) => f.filename);
    // If body says to replace, replace entirely
    if (body.replaceLegacyImages === "true") {
      doc.legacy.images = newFiles;
    } else {
      doc.legacy.images = [...(doc.legacy.images || []), ...newFiles];
    }
  }

  // Remove specific legacy image by filename
  if (body.removeLegacyImage) {
    doc.legacy.images = doc.legacy.images.filter(
      (img) => img !== body.removeLegacyImage
    );
  }

  /* ────── TAB 2: Vision & Mission ────── */
  if (body.visionSubtitleEn !== undefined) doc.vision.subtitle.en = body.visionSubtitleEn;
  if (body.visionSubtitleHi !== undefined) doc.vision.subtitle.hi = body.visionSubtitleHi;
  if (body.visionTitleEn !== undefined) doc.vision.title.en = body.visionTitleEn;
  if (body.visionTitleHi !== undefined) doc.vision.title.hi = body.visionTitleHi;
  if (body.visionQuoteEn !== undefined) doc.vision.quote.en = body.visionQuoteEn;
  if (body.visionQuoteHi !== undefined) doc.vision.quote.hi = body.visionQuoteHi;
  if (body.missionTitleEn !== undefined) doc.vision.missionTitle.en = body.missionTitleEn;
  if (body.missionTitleHi !== undefined) doc.vision.missionTitle.hi = body.missionTitleHi;
  if (body.missionDescEn !== undefined) doc.vision.missionDesc.en = body.missionDescEn;
  if (body.missionDescHi !== undefined) doc.vision.missionDesc.hi = body.missionDescHi;
  if (body.objectiveTitleEn !== undefined) doc.vision.objectiveTitle.en = body.objectiveTitleEn;
  if (body.objectiveTitleHi !== undefined) doc.vision.objectiveTitle.hi = body.objectiveTitleHi;
  if (body.objectiveDescEn !== undefined) doc.vision.objectiveDesc.en = body.objectiveDescEn;
  if (body.objectiveDescHi !== undefined) doc.vision.objectiveDesc.hi = body.objectiveDescHi;

  if (req.files?.visionImage?.length) {
    doc.vision.image = req.files.visionImage[0].filename;
  }

  /* ────── TAB 3: Core Values ────── */
  if (body.coreValues !== undefined) {
    try {
      doc.coreValues = JSON.parse(body.coreValues);
    } catch (e) {}
  }

  /* ────── TAB 4: Governance ────── */
  if (body.governanceTitleEn !== undefined) doc.governance.title.en = body.governanceTitleEn;
  if (body.governanceTitleHi !== undefined) doc.governance.title.hi = body.governanceTitleHi;
  if (body.governanceDescEn !== undefined) doc.governance.description.en = body.governanceDescEn;
  if (body.governanceDescHi !== undefined) doc.governance.description.hi = body.governanceDescHi;
  if (body.governanceRows !== undefined) {
    try {
      doc.governance.rows = JSON.parse(body.governanceRows);
    } catch (e) {}
  }

  /* ────── TAB 5: Compliance ────── */
  if (body.complianceTitleEn !== undefined) doc.compliance.title.en = body.complianceTitleEn;
  if (body.complianceTitleHi !== undefined) doc.compliance.title.hi = body.complianceTitleHi;
  if (body.complianceDescEn !== undefined) doc.compliance.description.en = body.complianceDescEn;
  if (body.complianceDescHi !== undefined) doc.compliance.description.hi = body.complianceDescHi;
  if (body.complianceItems !== undefined) {
    try {
      doc.compliance.items = JSON.parse(body.complianceItems);
    } catch (e) {}
  }
  if (body.complianceCards !== undefined) {
    try {
      doc.compliance.cards = JSON.parse(body.complianceCards);
    } catch (e) {}
  }

  await doc.save();

  res.json({
    success: true,
    aboutUs: doc,
  });
});
