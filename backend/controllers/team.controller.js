import fs from "fs";
import Team from "../models/Team.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Team.find();

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

      photo: req.file?.filename,
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
