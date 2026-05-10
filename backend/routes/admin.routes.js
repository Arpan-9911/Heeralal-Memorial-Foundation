import express from "express";

import {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  refreshAccessToken,
} from "../controllers/admin.controller.js";
import protectAdmin from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import loginLimiter from "../middleware/rateLimit.middleware.js";
import { loginSchema } from "../schemas/admin.schema.js";
const router = express.Router();

router.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  loginAdmin
);

router.post("/logout", logoutAdmin);
router.post("/refresh", refreshAccessToken);
router.get(
  "/me",
  protectAdmin,
  getAdminProfile
);

export default router;