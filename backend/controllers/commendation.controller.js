import Commendation from "../models/Commendation.js";
import asyncHandler from "../middleware/asyncHandler.js";

// GET — fetch the singleton commendation document (public)
export const getCommendation = asyncHandler(
  async (req, res) => {
    let doc = await Commendation.findOne();

    if (!doc) {
      doc = await Commendation.create({});
    }

    res.json({
      success: true,
      commendation: doc,
    });
  }
);

// PUT — update the commendation section (admin only)
export const updateCommendation = asyncHandler(
  async (req, res) => {
    let doc = await Commendation.findOne();

    if (!doc) {
      doc = await Commendation.create({});
    }

    // Text fields
    if (req.body.messageTitleEn !== undefined) {
      doc.messageTitle.en = req.body.messageTitleEn;
    }
    if (req.body.messageTitleHi !== undefined) {
      doc.messageTitle.hi = req.body.messageTitleHi;
    }
    if (req.body.messageBodyEn !== undefined) {
      doc.messageBody.en = req.body.messageBodyEn;
    }
    if (req.body.messageBodyHi !== undefined) {
      doc.messageBody.hi = req.body.messageBodyHi;
    }
    if (req.body.directorNameEn !== undefined) {
      doc.directorName.en = req.body.directorNameEn;
    }
    if (req.body.directorNameHi !== undefined) {
      doc.directorName.hi = req.body.directorNameHi;
    }
    if (req.body.directorPostEn !== undefined) {
      doc.directorPost.en = req.body.directorPostEn;
    }
    if (req.body.directorPostHi !== undefined) {
      doc.directorPost.hi = req.body.directorPostHi;
    }
    if (req.body.sectionSubtitleEn !== undefined) {
      doc.sectionSubtitle.en = req.body.sectionSubtitleEn;
    }
    if (req.body.sectionSubtitleHi !== undefined) {
      doc.sectionSubtitle.hi = req.body.sectionSubtitleHi;
    }
    if (req.body.sectionTitleEn !== undefined) {
      doc.sectionTitle.en = req.body.sectionTitleEn;
    }
    if (req.body.sectionTitleHi !== undefined) {
      doc.sectionTitle.hi = req.body.sectionTitleHi;
    }

    // File uploads
    if (req.files?.directorPhoto?.[0]) {
      doc.directorPhoto = req.files.directorPhoto[0].filename;
    }
    if (req.files?.letterImage?.[0]) {
      doc.letterImage = req.files.letterImage[0].filename;
    }

    await doc.save();

    res.json({
      success: true,
      commendation: doc,
    });
  }
);
