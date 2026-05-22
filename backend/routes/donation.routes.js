import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";
import uploadDonation from "../middleware/uploadDonation.middleware.js";

import {
  getDonateConfig,
  updateDonateConfig,
  createDonation,
  getDonations,
  updateDonationStatus,
  deleteDonation,
} from "../controllers/donation.controller.js";

const router = express.Router();

/* ───── Config (QR + Bank) ───── */
router.get("/config", getDonateConfig);
router.put(
  "/config",
  protectAdmin,
  uploadDonation.single("qrImage"),
  updateDonateConfig
);

/* ───── Donation Submissions ───── */
router.post("/", uploadDonation.single("screenshot"), createDonation);
router.get("/", protectAdmin, getDonations);
router.put("/:id", protectAdmin, updateDonationStatus);
router.delete("/:id", protectAdmin, deleteDonation);

export default router;
