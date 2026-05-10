import express from "express";

import protectAdmin from "../middleware/auth.middleware.js";

import {
  createJoinRequest,
  getJoinRequests,
  updateJoinRequestStatus,
  deleteJoinRequest,
} from "../controllers/joinRequest.controller.js";

const router = express.Router();

// Public — submit a join request
router.post("/", createJoinRequest);

// Admin — list all join requests
router.get("/", protectAdmin, getJoinRequests);

// Admin — update status
router.put("/:id", protectAdmin, updateJoinRequestStatus);

// Admin — delete request
router.delete("/:id", protectAdmin, deleteJoinRequest);

export default router;
