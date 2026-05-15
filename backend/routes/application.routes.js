import express from "express";
import uploadApplication from "../middleware/uploadApplication.js";

import {
  getApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get("/", getApplications);

router.post("/", uploadApplication.single("photo"), createApplication);

router.patch("/:id/status", updateApplicationStatus);

router.delete("/:id", deleteApplication);

export default router;
