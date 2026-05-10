import express from "express";

import {
  getMedia,
  addImage,
  deleteImage,
  saveVideo,
} from "../controllers/media.controller.js";

import { uploadMedia } from "../middleware/uploadMedia.js";

const router = express.Router();

router.get("/", getMedia);

router.post("/image", uploadMedia.single("image"), addImage);

router.delete("/image/:id", deleteImage);

router.post("/video", uploadMedia.single("video"), saveVideo);

export default router;
