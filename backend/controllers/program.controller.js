import fs from "fs";
import Program from "../models/Program.js";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const createProgram = async (req, res) => {
  try {
    const program = await Program.create({
      category: {
        en: req.body.categoryEn,
        hi: req.body.categoryHi,
      },

      name: {
        en: req.body.nameEn,
        hi: req.body.nameHi,
      },

      description: {
        en: req.body.descEn,
        hi: req.body.descHi,
      },

      longDescription: {
        en: req.body.longDescEn || "",
        hi: req.body.longDescHi || "",
      },

      location: {
        en: req.body.locationEn || "",
        hi: req.body.locationHi || "",
      },

      centres: {
        en: req.body.centresEn || "",
        hi: req.body.centresHi || "",
      },

      active: req.body.active === "true",

      image: req.file?.filename,
    });

    res.status(201).json({
      success: true,
      program,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
      });
    }

    if (req.file) {
      const oldPath = `uploads/programs/${program.image}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      program.image = req.file.filename;
    }

    program.category = {
      en: req.body.categoryEn,
      hi: req.body.categoryHi,
    };

    program.name = {
      en: req.body.nameEn,
      hi: req.body.nameHi,
    };

    program.description = {
      en: req.body.descEn,
      hi: req.body.descHi,
    };

    program.longDescription = {
      en: req.body.longDescEn || "",
      hi: req.body.longDescHi || "",
    };

    program.location = {
      en: req.body.locationEn || "",
      hi: req.body.locationHi || "",
    };

    program.centres = {
      en: req.body.centresEn || "",
      hi: req.body.centresHi || "",
    };

    program.active = req.body.active === "true";

    await program.save();

    res.json({
      success: true,
      program,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
      });
    }

    const filePath = `uploads/programs/${program.image}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await program.deleteOne();

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};