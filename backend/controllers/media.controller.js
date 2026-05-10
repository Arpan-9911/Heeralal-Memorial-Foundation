import fs from "fs";
import MediaGallery from "../models/Media.js";

// Get Media
export const getMedia = async (req, res) => {
  try {
    let media = await MediaGallery.findOne();

    if (!media) {
      media = await MediaGallery.create({
        images: [],
      });
    }

    res.status(200).json({
      success: true,
      media,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
    });
  }
};

// Add Image
export const addImage = async (req, res) => {
  try {
    const { alt } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    let media = await MediaGallery.findOne();

    if (!media) {
      media = await MediaGallery.create({
        images: [],
      });
    }

    const imageObj = {
      image: req.file.filename,
      alt,
    };

    media.images.unshift(imageObj);

    await media.save();

    res.status(201).json({
      success: true,
      image: media.images[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add image",
    });
  }
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await MediaGallery.findOne();

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const img = media.images.id(id);

    if (!img) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const path = `uploads/media/images/${img.image}`;

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    img.deleteOne();

    await media.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

// Add / Update Video
export const saveVideo = async (req, res) => {
  try {
    const { captionEn, captionHi } = req.body;

    let media = await MediaGallery.findOne();

    if (!media) {
      media = await MediaGallery.create({
        images: [],
      });
    }

    // remove old video
    if (req.file && media.video?.file) {
      const oldPath = `uploads/media/video/${media.video.file}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    media.video = {
      file: req.file?.filename || media.video?.file,

      caption: {
        en: captionEn,
        hi: captionHi,
      },
    };

    await media.save();

    res.status(200).json({
      success: true,
      video: media.video,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
