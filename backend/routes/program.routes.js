import express from "express";

import upload from "../middleware/uploadPrograms.js";

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller.js";

const router =
  express.Router();

router.get(
  "/",
  getPrograms
);

router.post(
  "/",
  upload.single("image"),
  createProgram
);

router.put(
  "/:id",
  upload.single("image"),
  updateProgram
);

router.delete(
  "/:id",
  deleteProgram
);

export default router;