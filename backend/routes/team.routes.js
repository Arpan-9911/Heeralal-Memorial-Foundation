import express from "express";

import upload from "../middleware/uploadTeam.js";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  reorderMembers,
} from "../controllers/team.controller.js";

const router =
  express.Router();

router.get(
  "/",
  getMembers
);

router.post(
  "/",
  upload.single("photo"),
  createMember
);

router.put(
  "/:id",
  upload.single("photo"),
  updateMember
);

router.delete(
  "/:id",
  deleteMember
);

router.patch(
  "/reorder",
  reorderMembers
);

export default router;