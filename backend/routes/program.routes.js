import express from "express";

import upload from "../middleware/uploadPrograms.js";

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  reorderPrograms,
} from "../controllers/program.controller.js";

const router =
  express.Router();

router.get(
  "/",
  getPrograms
);

router.patch(
  "/reorder",
  reorderPrograms
);

router.post(
  "/",
  upload.any(),
  createProgram
);

router.put(
  "/:id",
  upload.any(),
  updateProgram
);

router.delete(
  "/:id",
  deleteProgram
);

export default router;