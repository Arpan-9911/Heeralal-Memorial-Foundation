import express from "express";

import upload from "../middleware/uploadAchievement.js";

import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievement.controller.js";

const router =
  express.Router();

router.get(
  "/",
  getAchievements
);

router.post(
  "/",
  upload.single("image"),
  createAchievement
);

router.put(
  "/:id",
  upload.single("image"),
  updateAchievement
);

router.delete(
  "/:id",
  deleteAchievement
);

export default router;