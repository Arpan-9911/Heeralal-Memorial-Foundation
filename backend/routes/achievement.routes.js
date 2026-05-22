import express from "express";

import upload from "../middleware/uploadAchievement.js";

import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  reorderAchievements,
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

router.patch(
  "/reorder",
  reorderAchievements
);

export default router;