// controllers/news.controller.js

import fs from "fs";
import News from "../models/News.js";

// GET ALL
export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      news,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET BY ID
export const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({
        success: false,
        message: "News post not found",
      });
    }
    res.json({
      success: true,
      news: newsItem,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ADD
export const addNews = async (req, res) => {
  try {
    const news = await News.create({
      tag: req.body.tag,
      date: req.body.date,

      title: {
        en: req.body.titleEn,
        hi: req.body.titleHi,
      },

      image: req.file?.filename || "",
    });

    res.status(201).json({
      success: true,
      news,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updateNews = async (req, res) => {
  try {
    const existing = await News.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    let image = existing.image;

    // replace image
    if (req.file) {
      if (existing.image && fs.existsSync(`uploads/news/${existing.image}`)) {
        fs.unlinkSync(`uploads/news/${existing.image}`);
      }

      image = req.file.filename;
    }

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      {
        tag: req.body.tag,
        date: req.body.date,

        title: {
          en: req.body.titleEn,
          hi: req.body.titleHi,
        },

        image,
      },
      {
        new: true,
      },
    );

    res.json({
      success: true,
      news: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
      });
    }

    if (news.image && fs.existsSync(`uploads/news/${news.image}`)) {
      fs.unlinkSync(`uploads/news/${news.image}`);
    }

    await News.findByIdAndDelete(req.params.id);

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
