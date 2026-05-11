import Hero from "../models/HeroSlide.js";
import Announcement from "../models/Announcement.js";
import Commendation from "../models/Commendation.js";
import Stats from "../models/Stats.js";
import News from "../models/News.js";
import Program from "../models/Program.js";
import Team from "../models/Team.js";

export const getHomeData = async (req, res, next) => {
  try {
    const [
      heroSlides,
      announcements,
      commendation,
      stats,
      programs,
      news,
      team
    ] = await Promise.all([
      Hero.find().sort({ createdAt: -1 }),
      Announcement.find().sort({ createdAt: -1 }).limit(10),
      Commendation.findOne(),
      Stats.find(),
      Program.find().limit(4),
      News.find().sort({ createdAt: -1 }).limit(2),
      Team.find()
    ]);

    res.status(200).json({
      success: true,

      data: {
        heroSlides,
        announcements,
        commendation,
        stats,
        programs,
        news,
        team
      },
    });
  } catch (error) {
    next(error);
  }
};