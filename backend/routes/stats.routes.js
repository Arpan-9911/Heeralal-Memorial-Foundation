// routes/stats.routes.js

import express from "express";

import {
  getStats,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/", getStats);

router.post("/", createStat);

router.put("/:id", updateStat);

router.delete("/:id", deleteStat);

export default router;