import express from "express";
import upload from "../middleware/uploadPatron.js";
import protectAdmin from "../middleware/auth.middleware.js";
import {
  getPatrons,
  createPatron,
  updatePatron,
  deletePatron,
  reorderPatrons,
} from "../controllers/patron.controller.js";

const router = express.Router();

router.get("/", getPatrons);

// Admin-only modifying routes
router.post("/", protectAdmin, upload.single("photo"), createPatron);
router.put("/:id", protectAdmin, upload.single("photo"), updatePatron);
router.delete("/:id", protectAdmin, deletePatron);
router.patch("/reorder", protectAdmin, reorderPatrons);

export default router;
