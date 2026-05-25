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
import commendationRoutes from "./routes/commendation.routes.js";
import joinRequestRoutes from "./routes/joinRequest.routes.js";
import donationRoutes from "./routes/donation.routes.js";
import socialLinksRoutes from "./routes/socialLinks.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import aboutUsRoutes from "./routes/aboutUs.routes.js";
import sacredMemoryRoutes from "./routes/sacredMemory.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import pillarRoutes from "./routes/pillar.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import commendationCardRoutes from "./routes/commendationCard.routes.js";
import patronRoutes from "./routes/patron.routes.js";

import homeRoutes from "./routes/home.routes.js";

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
    origin: [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL_2,
    ],
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
app.use("/api/commendation", commendationRoutes);
app.use("/api/join-requests", joinRequestRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/sacred-memory", sacredMemoryRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/pillars", pillarRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/commendation-cards", commendationCardRoutes);
app.use("/api/patrons", patronRoutes);

app.use("/api/home", homeRoutes);

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
