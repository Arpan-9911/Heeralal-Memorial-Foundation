import express from "express";

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../controllers/announcement.controller.js";

import protectAdmin from "../middleware/auth.middleware.js";

const router =
  express.Router();

router.get(
  "/",
  getAnnouncements
);

router.post(
  "/",
  protectAdmin,
  createAnnouncement
);

router.put(
  "/:id",
  protectAdmin,
  updateAnnouncement
);

router.delete(
  "/:id",
  protectAdmin,
  deleteAnnouncement
);

export default router;