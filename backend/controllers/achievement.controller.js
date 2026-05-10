import fs from "fs";

import Achievement from "../models/Achievement.js";

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      achievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create({
      title: {
        en: req.body.titleEn,
        hi: req.body.titleHi,
      },

      description: {
        en: req.body.descEn,
        hi: req.body.descHi,
      },

      presentedBy: {
        en: req.body.presentedByEn,
        hi: req.body.presentedByHi,
      },

      image: req.file?.filename,
    });

    res.status(201).json({
      success: true,
      achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    if (req.file) {
      const oldPath = `uploads/achievements/${achievement.image}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      achievement.image = req.file.filename;
    }

    achievement.title = {
      en: req.body.titleEn,
      hi: req.body.titleHi,
    };

    achievement.description = {
      en: req.body.descEn,
      hi: req.body.descHi,
    };

    achievement.presentedBy = {
      en: req.body.presentedByEn,
      hi: req.body.presentedByHi,
    };

    await achievement.save();

    res.json({
      success: true,
      achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    const filePath = `uploads/achievements/${achievement.image}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await achievement.deleteOne();

    res.json({
      success: true,
      message: "Achievement deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
