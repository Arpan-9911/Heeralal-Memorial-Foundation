import express from "express";

import protectAdmin from "../middleware/auth.middleware.js";
import uploadCommendation from "../middleware/uploadCommendation.middleware.js";

import {
  getCommendation,
  updateCommendation,
} from "../controllers/commendation.controller.js";

const router = express.Router();

// Public — fetch commendation data
router.get("/", getCommendation);

// Admin — update commendation (two image fields)
router.put(
  "/",
  protectAdmin,
  uploadCommendation.fields([
    { name: "directorPhoto", maxCount: 1 },
    { name: "letterImage", maxCount: 1 },
  ]),
  updateCommendation
);

export default router;
