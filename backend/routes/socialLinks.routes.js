import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";
import {
  getSocialLinks,
  updateSocialLinks,
} from "../controllers/socialLinks.controller.js";

const router = express.Router();

router.get("/", getSocialLinks);
router.put("/", protectAdmin, updateSocialLinks);

export default router;
