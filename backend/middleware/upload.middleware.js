import multer from "multer";

import path from "path";

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      "uploads/heroslides"
    );
  },

  filename: (
    req,
    file,
    cb
  ) => {
    const unique =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      );

    cb(
      null,
      unique +
        path.extname(
          file.originalname
        )
    );
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {
  // Allow all image mime types
  if (
    file.mimetype.startsWith(
      "image/"
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files allowed"
      )
    );
  }
};

const upload = multer({
  storage,

  fileFilter,
});

export default upload;