import express from "express";
import { getSacredMemory, updateSacredMemory } from "../controllers/sacredMemory.controller.js";
import protectAdmin from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSacredMemory);
router.put("/", protectAdmin, updateSacredMemory);

export default router;
