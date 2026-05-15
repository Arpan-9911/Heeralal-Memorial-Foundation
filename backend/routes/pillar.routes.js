import express from "express";

import {
  getPillars,
  createPillar,
  updatePillar,
  deletePillar,
} from "../controllers/pillar.controller.js";

const router = express.Router();

router.get("/", getPillars);

router.post("/", createPillar);

router.put("/:id", updatePillar);

router.delete("/:id", deletePillar);

export default router;
