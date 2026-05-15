import Pillar from "../models/Pillar.js";

// GET ALL
export const getPillars = async (req, res) => {
  try {
    const pillars = await Pillar.find().sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      pillars,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CREATE
export const createPillar = async (req, res) => {
  try {
    const count = await Pillar.countDocuments();

    const pillar = await Pillar.create({
      icon: req.body.icon,
      order: count,
      title: {
        en: req.body.titleEn,
        hi: req.body.titleHi,
      },
      desc: {
        en: req.body.descEn,
        hi: req.body.descHi,
      },
    });

    res.status(201).json({
      success: true,
      pillar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updatePillar = async (req, res) => {
  try {
    const pillar = await Pillar.findByIdAndUpdate(
      req.params.id,
      {
        icon: req.body.icon,
        title: {
          en: req.body.titleEn,
          hi: req.body.titleHi,
        },
        desc: {
          en: req.body.descEn,
          hi: req.body.descHi,
        },
      },
      {
        new: true,
      }
    );

    if (!pillar) {
      return res.status(404).json({
        success: false,
        message: "Pillar not found",
      });
    }

    res.json({
      success: true,
      pillar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deletePillar = async (req, res) => {
  try {
    const pillar = await Pillar.findByIdAndDelete(req.params.id);

    if (!pillar) {
      return res.status(404).json({
        success: false,
        message: "Pillar not found",
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
