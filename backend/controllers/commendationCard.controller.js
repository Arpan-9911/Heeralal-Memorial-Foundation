import fs from "fs";
import CommendationCard from "../models/CommendationCard.js";

export const getCommendationCards = async (req, res) => {
  try {
    const cards = await CommendationCard.find().sort({
      serialNumber: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      cards,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createCommendationCard = async (req, res) => {
  try {
    const lastCard = await CommendationCard.findOne().sort({ serialNumber: -1 });
    const nextSerialNumber = lastCard ? (lastCard.serialNumber || 0) + 1 : 0;

    const leftPhotoFile = req.files?.leftPhoto?.[0];
    const rightPhotoFile = req.files?.rightPhoto?.[0];

    const card = await CommendationCard.create({
      title: {
        en: req.body.titleEn,
        hi: req.body.titleHi || "",
      },
      content: {
        en: req.body.contentEn || "",
        hi: req.body.contentHi || "",
      },
      byName: {
        en: req.body.byNameEn || "",
        hi: req.body.byNameHi || "",
      },
      byDesignation: {
        en: req.body.byDesignationEn || "",
        hi: req.body.byDesignationHi || "",
      },
      leftPhoto: leftPhotoFile ? leftPhotoFile.filename : "",
      rightPhoto: rightPhotoFile ? rightPhotoFile.filename : "",
      serialNumber: nextSerialNumber,
      active: req.body.active === "true",
    });

    res.status(201).json({
      success: true,
      card,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateCommendationCard = async (req, res) => {
  try {
    const card = await CommendationCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Handle left photo replacement
    const leftPhotoFile = req.files?.leftPhoto?.[0];
    if (leftPhotoFile) {
      if (card.leftPhoto) {
        const oldPath = `uploads/commendation-cards/${card.leftPhoto}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      card.leftPhoto = leftPhotoFile.filename;
    }

    // Handle right photo replacement
    const rightPhotoFile = req.files?.rightPhoto?.[0];
    if (rightPhotoFile) {
      if (card.rightPhoto) {
        const oldPath = `uploads/commendation-cards/${card.rightPhoto}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      card.rightPhoto = rightPhotoFile.filename;
    }

    card.title = {
      en: req.body.titleEn,
      hi: req.body.titleHi || "",
    };

    card.content = {
      en: req.body.contentEn || "",
      hi: req.body.contentHi || "",
    };

    card.byName = {
      en: req.body.byNameEn || "",
      hi: req.body.byNameHi || "",
    };

    card.byDesignation = {
      en: req.body.byDesignationEn || "",
      hi: req.body.byDesignationHi || "",
    };

    card.active = req.body.active === "true";

    await card.save();

    res.json({
      success: true,
      card,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteCommendationCard = async (req, res) => {
  try {
    const card = await CommendationCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Cleanup left photo
    if (card.leftPhoto) {
      const leftPath = `uploads/commendation-cards/${card.leftPhoto}`;
      if (fs.existsSync(leftPath)) fs.unlinkSync(leftPath);
    }

    // Cleanup right photo
    if (card.rightPhoto) {
      const rightPath = `uploads/commendation-cards/${card.rightPhoto}`;
      if (fs.existsSync(rightPath)) fs.unlinkSync(rightPath);
    }

    await card.deleteOne();

    res.json({
      success: true,
      message: "Commendation card deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const reorderCommendationCards = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({
        success: false,
        message: "orderedIds array is required",
      });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { serialNumber: index },
      },
    }));

    await CommendationCard.bulkWrite(bulkOps);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
