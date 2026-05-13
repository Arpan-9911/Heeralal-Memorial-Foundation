import express from "express";
import { getSacredMemory, updateSacredMemory } from "../controllers/sacredMemory.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSacredMemory);
router.put("/", protect, updateSacredMemory);

export default router;
