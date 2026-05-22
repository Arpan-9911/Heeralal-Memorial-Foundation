import fs from "fs";
import Program from "../models/Program.js";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({
      serialNumber: 1,
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
    const mainImageFile = req.files?.find((f) => f.fieldname === "image");
    const image = mainImageFile ? mainImageFile.filename : "";

    let centresList = [];
    if (req.body.centresList) {
      try {
        centresList = JSON.parse(req.body.centresList);
      } catch (e) {
        console.error("Failed to parse centresList:", e);
      }
    }

    // Assign uploaded filenames for each center
    centresList = centresList.map((centre, index) => {
      const file = req.files?.find((f) => f.fieldname === `centreImage_${index}`);
      if (file) {
        centre.image = file.filename;
      }
      return centre;
    });

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

      centresList,

      active: req.body.active === "true",

      image,
    });

    res.status(201).json({
      success: true,
      program,
    });
  } catch (err) {
    console.error(err);
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

    const mainImageFile = req.files?.find((f) => f.fieldname === "image");
    if (mainImageFile) {
      const oldPath = `uploads/programs/${program.image}`;

      if (program.image && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      program.image = mainImageFile.filename;
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

    if (req.body.centresList !== undefined) {
      let newCentresList = [];
      try {
        newCentresList = JSON.parse(req.body.centresList);
      } catch (e) {
        console.error("Failed to parse centresList:", e);
      }

      // Assign uploaded filenames for each center
      newCentresList = newCentresList.map((centre, index) => {
        const file = req.files?.find((f) => f.fieldname === `centreImage_${index}`);
        if (file) {
          centre.image = file.filename;
        }
        return centre;
      });

      // Cleanup deleted or replaced center images
      const oldCentresList = program.centresList || [];
      const newImageFilenames = new Set(newCentresList.map((c) => c.image).filter(Boolean));
      for (const oldCentre of oldCentresList) {
        if (oldCentre.image && !newImageFilenames.has(oldCentre.image)) {
          const pathToDelete = `uploads/programs/${oldCentre.image}`;
          if (fs.existsSync(pathToDelete)) {
            fs.unlinkSync(pathToDelete);
          }
        }
      }

      program.centresList = newCentresList;
    }
    program.active = req.body.active === "true";

    await program.save();

    res.json({
      success: true,
      program,
    });
  } catch (err) {
    console.error(err);
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

    // Delete all center images
    if (program.centresList && program.centresList.length > 0) {
      for (const centre of program.centresList) {
        if (centre.image) {
          const centreImagePath = `uploads/programs/${centre.image}`;
          if (fs.existsSync(centreImagePath)) {
            fs.unlinkSync(centreImagePath);
          }
        }
      }
    }

    await program.deleteOne();

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
    });
  }
};

export const reorderPrograms = async (req, res) => {
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

    await Program.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: "Programs reordered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};