// controllers/stats.controller.js

import Stats from "../models/Stats.js";

// GET ALL
export const getStats = async (req, res) => {
  try {
    const stats = await Stats.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      stats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CREATE
export const createStat = async (req, res) => {
  try {
    const stat = await Stats.create({
      icon: req.body.icon,
      value: req.body.value,

      label: {
        en: req.body.labelEn,
        hi: req.body.labelHi,
      },
    });

    res.status(201).json({
      success: true,
      stat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updateStat = async (req, res) => {
  try {
    const stat = await Stats.findByIdAndUpdate(
      req.params.id,
      {
        icon: req.body.icon,
        value: req.body.value,

        label: {
          en: req.body.labelEn,
          hi: req.body.labelHi,
        },
      },
      {
        new: true,
      },
    );

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: "Stat not found",
      });
    }

    res.json({
      success: true,
      stat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deleteStat = async (req, res) => {
  try {
    const stat = await Stats.findByIdAndDelete(req.params.id);

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: "Stat not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
