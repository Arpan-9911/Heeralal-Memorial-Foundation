import SacredMemory from "../models/SacredMemory.js";

// Default data representing the layout requested by the user
const defaultData = {
  heading: {
    en: "Late Heeralal Yadav",
    hi: "स्वर्गीय हीरालाल यादव",
  },
  lifespan: {
    en: "1926 - 1991",
    hi: "1926 - 1991",
  },
  description: {
    en: "This organization is a living tribute to the late Heeralal Yadav Ji, created to honor his memory and carry forward his enduring legacy.",
    hi: "यह संगठन स्वर्गीय हीरालाल यादव जी को एक जीवंत श्रद्धांजलि है, जिसे उनकी स्मृति का सम्मान करने और उनकी स्थायी विरासत को आगे बढ़ाने के लिए बनाया गया है।",
  },
};

export const getSacredMemory = async (req, res) => {
  try {
    let memory = await SacredMemory.findOne();
    if (!memory) {
      // If none exists, return default
      return res.json({ success: true, memory: defaultData });
    }
    res.json({ success: true, memory });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateSacredMemory = async (req, res) => {
  try {
    let memory = await SacredMemory.findOne();

    if (!memory) {
      memory = new SacredMemory();
    }

    memory.heading = {
      en: req.body.headingEn,
      hi: req.body.headingHi,
    };
    memory.lifespan = {
      en: req.body.lifespanEn,
      hi: req.body.lifespanHi,
    };
    memory.description = {
      en: req.body.descriptionEn,
      hi: req.body.descriptionHi,
    };

    await memory.save();

    res.json({ success: true, memory });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
