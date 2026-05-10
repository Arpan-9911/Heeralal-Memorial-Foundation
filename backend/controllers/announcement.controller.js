import Announcement from "../models/Announcement.js";

export const getAnnouncements =
  async (req, res) => {
    const announcements =
      await Announcement.find().sort(
        {
          date: -1,
        }
      );

    res.json({
      success: true,
      announcements,
    });
  };

export const createAnnouncement =
  async (req, res) => {
    const announcement =
      await Announcement.create({
        type: req.body.type,

        title: {
          en:
            req.body.titleEn,

          hi:
            req.body.titleHi,
        },

        excerpt: {
          en:
            req.body
              .excerptEn,

          hi:
            req.body
              .excerptHi,
        },

        date: req.body.date,

        active:
          req.body.active,
      });

    res.status(201).json({
      success: true,
      announcement,
    });
  };

export const updateAnnouncement =
  async (req, res) => {
    const announcement =
      await Announcement.findById(
        req.params.id
      );

    if (!announcement) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Announcement not found",
        });
    }

    announcement.type =
      req.body.type;

    announcement.title = {
      en:
        req.body.titleEn,

      hi:
        req.body.titleHi,
    };

    announcement.excerpt = {
      en:
        req.body.excerptEn,

      hi:
        req.body.excerptHi,
    };

    announcement.date =
      req.body.date;

    announcement.active =
      req.body.active;

    await announcement.save();

    res.json({
      success: true,
      announcement,
    });
  };

export const deleteAnnouncement =
  async (req, res) => {
    await Announcement.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Announcement deleted",
    });
  };