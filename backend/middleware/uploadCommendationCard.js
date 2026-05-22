import multer from "multer";
import path from "path";
import fs from "fs";

const dir = "uploads/commendation-cards";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
