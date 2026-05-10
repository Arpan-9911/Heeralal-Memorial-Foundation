import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";

import adminRoutes from "./routes/admin.routes.js";
import heroRoutes from "./routes/hero.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import teamRoutes from "./routes/team.routes.js";
import programRoutes from "./routes/program.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import newsRoutes from "./routes/news.routes.js";
import statsRoutes from "./routes/stats.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/* ───────────────── SECURITY ───────────────── */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

/* ───────────────── CORS ───────────────── */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",

    credentials: true,
  }),
);

/* ───────────────── MIDDLEWARE ───────────────── */

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

/* ───────────────── STATIC FILES ───────────────── */

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ───────────────── ROUTES ───────────────── */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running",
  });
});

app.use("/api/admin", adminRoutes);
app.use("/api/heroslides", heroRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stats", statsRoutes);

/* ───────────────── ERROR HANDLER ───────────────── */

app.use(errorMiddleware);

/* ───────────────── DATABASE ───────────────── */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });
