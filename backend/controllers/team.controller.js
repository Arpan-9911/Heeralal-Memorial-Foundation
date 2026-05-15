import fs from "fs";
import Team from "../models/Team.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createMember = async (req, res, next) => {
  try {
    // Auto-assign order to end of the tier
    const lastMember = await Team.findOne({ tier: req.body.tier }).sort({ order: -1 });
    const nextOrder = lastMember ? (lastMember.order || 0) + 1 : 0;

    const member = await Team.create({
      tier: req.body.tier,

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

      shortDescription: {
        en: req.body.shortDescEn || "",
        hi: req.body.shortDescHi || "",
      },

      message: {
        en: req.body.messageEn || "",
        hi: req.body.messageHi || "",
      },

      displayName: {
        en: req.body.displayNameEn || "",
        hi: req.body.displayNameHi || "",
      },

      displayDesignation: {
        en: req.body.displayDesignationEn || "",
        hi: req.body.displayDesignationHi || "",
      },

      photo: req.file?.filename,
      order: nextOrder,
    });

    res.status(201).json({
      success: true,
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    if (req.file) {
      const oldPath = `uploads/team/${member.photo}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      member.photo = req.file.filename;
    }

    member.tier = req.body.tier;

    member.name = {
      en: req.body.nameEn,
      hi: req.body.nameHi,
    };

    member.role = {
      en: req.body.roleEn,
      hi: req.body.roleHi,
    };

    member.quote = {
      en: req.body.quoteEn,
      hi: req.body.quoteHi,
    };

    member.shortDescription = {
      en: req.body.shortDescEn || "",
      hi: req.body.shortDescHi || "",
    };

    member.message = {
      en: req.body.messageEn || "",
      hi: req.body.messageHi || "",
    };

    member.displayName = {
      en: req.body.displayNameEn || "",
      hi: req.body.displayNameHi || "",
    };

    member.displayDesignation = {
      en: req.body.displayDesignationEn || "",
      hi: req.body.displayDesignationHi || "",
    };

    await member.save();

    res.json({
      success: true,
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const filePath = `uploads/team/${member.photo}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await member.deleteOne();

    res.json({
      success: true,
      message: "Member deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Bulk reorder members
export const reorderMembers = async (req, res) => {
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

    await Team.bulkWrite(bulkOps);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
