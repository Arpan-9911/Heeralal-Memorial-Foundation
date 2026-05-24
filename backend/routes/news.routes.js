// routes/news.routes.js

import express from "express";

import {
  getNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controller.js";

import { uploadNews } from "../middleware/uploadNews.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);

router.post(
  "/",
  uploadNews.single("image"),
  addNews
);

router.put(
  "/:id",
  uploadNews.single("image"),
  updateNews
);

router.delete("/:id", deleteNews);

export default router;