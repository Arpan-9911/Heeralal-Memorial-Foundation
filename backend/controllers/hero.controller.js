import HeroSlide from "../models/HeroSlide.js";

export const getSlides =
  async (req, res) => {
    const slides =
      await HeroSlide.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      slides,
    });
  };

export const createSlide =
  async (req, res) => {
    const slide =
      await HeroSlide.create({
        title: {
          en:
            req.body.titleEn,

          hi:
            req.body.titleHi,
        },

        subtitle: {
          en:
            req.body
              .subtitleEn,

          hi:
            req.body
              .subtitleHi,
        },

        active:
          req.body.active,

        image:
          req.file.filename,
      });

    res.status(201).json({
      success: true,
      slide,
    });
  };

export const updateSlide =
  async (req, res) => {
    const slide =
      await HeroSlide.findById(
        req.params.id
      );

    if (!slide) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Slide not found",
        });
    }

    slide.title = {
      en:
        req.body.titleEn,

      hi:
        req.body.titleHi,
    };

    slide.subtitle = {
      en:
        req.body.subtitleEn,

      hi:
        req.body.subtitleHi,
    };

    slide.active =
      req.body.active;

    if (req.file) {
      slide.image =
        req.file.filename;
    }

    await slide.save();

    res.json({
      success: true,
      slide,
    });
  };

export const deleteSlide =
  async (req, res) => {
    await HeroSlide.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Slide deleted",
    });
  };