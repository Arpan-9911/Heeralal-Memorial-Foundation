import multer from "multer";
import path from "path";
import fs from "fs";

const imagePath = "uploads/media/images";

const videoPath = "uploads/media/video";

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, {
    recursive: true,
  });
}

if (!fs.existsSync(videoPath)) {
  fs.mkdirSync(videoPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, imagePath);
    } else {
      cb(null, videoPath);
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});

export const uploadMedia = multer({
  storage,
});
