import fs from "fs";
import Patron from "../models/Patron.js";

export const getPatrons = async (req, res) => {
  try {
    const patrons = await Patron.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      patrons,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createPatron = async (req, res) => {
  try {
    const lastPatron = await Patron.findOne().sort({ order: -1 });
    const nextOrder = lastPatron ? (lastPatron.order || 0) + 1 : 0;

    const patron = await Patron.create({
      name: {
        en: req.body.nameEn,
        hi: req.body.nameHi,
      },
      role: {
        en: req.body.roleEn,
        hi: req.body.roleHi,
      },
      quote: {
        en: req.body.quoteEn,
        hi: req.body.quoteHi,
      },
      photo: req.file?.filename,
      order: nextOrder,
    });

    res.status(201).json({
      success: true,
      patron,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updatePatron = async (req, res) => {
  try {
    const patron = await Patron.findById(req.params.id);

    if (!patron) {
      return res.status(404).json({
        success: false,
        message: "Patron not found",
      });
    }

    if (req.file) {
      const oldPath = `uploads/patrons/${patron.photo}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      patron.photo = req.file.filename;
    }

    patron.name = {
      en: req.body.nameEn,
      hi: req.body.nameHi,
    };

    patron.role = {
      en: req.body.roleEn,
      hi: req.body.roleHi,
    };

    patron.quote = {
      en: req.body.quoteEn,
      hi: req.body.quoteHi,
    };

    await patron.save();

    res.json({
      success: true,
      patron,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deletePatron = async (req, res) => {
  try {
    const patron = await Patron.findById(req.params.id);

    if (!patron) {
      return res.status(404).json({
        success: false,
        message: "Patron not found",
      });
    }

    const filePath = `uploads/patrons/${patron.photo}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await patron.deleteOne();

    res.json({
      success: true,
      message: "Patron deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const reorderPatrons = async (req, res) => {
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
        update: { order: index },
      },
    }));

    await Patron.bulkWrite(bulkOps);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
