import express from "express";

import upload from "../middleware/uploadCommendationCard.js";

import {
  getCommendationCards,
  createCommendationCard,
  updateCommendationCard,
  deleteCommendationCard,
  reorderCommendationCards,
} from "../controllers/commendationCard.controller.js";

const router = express.Router();

router.get("/", getCommendationCards);

router.post(
  "/",
  upload.fields([
    { name: "leftPhoto", maxCount: 1 },
    { name: "rightPhoto", maxCount: 1 },
  ]),
  createCommendationCard
);

router.put(
  "/:id",
  upload.fields([
    { name: "leftPhoto", maxCount: 1 },
    { name: "rightPhoto", maxCount: 1 },
  ]),
  updateCommendationCard
);

router.delete("/:id", deleteCommendationCard);

router.patch("/reorder", reorderCommendationCards);

export default router;
