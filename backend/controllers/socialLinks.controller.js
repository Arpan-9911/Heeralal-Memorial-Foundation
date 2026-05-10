import SocialLinks from "../models/SocialLinks.js";
import asyncHandler from "../middleware/asyncHandler.js";

// GET — public: fetch social links
export const getSocialLinks = asyncHandler(async (req, res) => {
  let links = await SocialLinks.findOne();
  if (!links) {
    links = await SocialLinks.create({});
  }
  res.json({ success: true, links });
});

// PUT — admin: update social links
export const updateSocialLinks = asyncHandler(async (req, res) => {
  let links = await SocialLinks.findOne();
  if (!links) {
    links = await SocialLinks.create({});
  }

  const fields = [
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "youtube",
    "whatsapp",
    "phone",
  ];

  fields.forEach((f) => {
    if (req.body[f] !== undefined) {
      links[f] = req.body[f];
    }
  });

  await links.save();
  res.json({ success: true, links });
});
