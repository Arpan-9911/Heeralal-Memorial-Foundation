import express from "express";

import upload from "../middleware/upload.middleware.js";

import protectAdmin from "../middleware/auth.middleware.js";

import {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} from "../controllers/hero.controller.js";

const router =
  express.Router();

router.get("/", getSlides);

router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  createSlide
);

router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  updateSlide
);

router.delete(
  "/:id",
  protectAdmin,
  deleteSlide
);

export default router;