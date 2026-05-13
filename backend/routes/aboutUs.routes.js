import express from "express";

import protectAdmin from "../middleware/auth.middleware.js";
import uploadAbout from "../middleware/uploadAbout.middleware.js";

import {
  getAboutUs,
  updateAboutUs,
} from "../controllers/aboutUs.controller.js";

const router = express.Router();

// Public — fetch about-us data
router.get("/", getAboutUs);

// Admin — update about-us (legacy images)
router.put(
  "/",
  protectAdmin,
  uploadAbout.fields([
    { name: "legacyImages", maxCount: 5 },
  ]),
  updateAboutUs
);

export default router;
