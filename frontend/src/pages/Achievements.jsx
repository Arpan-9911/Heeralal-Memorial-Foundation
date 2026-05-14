import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getAchievements, getStats } from "../api";

const languageFallback = (textObj, lang) => {
  return textObj[lang] || textObj["en"] || textObj["hi"] || "N/A";
};

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const StatsBar = () => {
  const { lang } = useLanguage();
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data.stats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {item.value}
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1">
            {languageFallback(item.label, lang)}
          </p>
        </div>
      ))}
    </div>
  );
};

const AchievementCard = ({ data, reverse }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-5 items-stretch">
        {/* IMAGE */}
        <div
          className={`md:col-span-2 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="relative w-full h-full aspect-[4/3]">
            <img
              src={
                import.meta.env.VITE_BACKEND_URL +
                "/uploads/achievements/" +
                data.image
              }
              alt={languageFallback(data.title, lang)}
              className="absolute inset-0 w-full h-full object-fill"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={`md:col-span-3 flex flex-col justify-center p-6 md:p-8 lg:p-10 ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] leading-snug mb-4">
            {languageFallback(data.title, lang)}
          </h3>

          {/* Description */}
          <p
            className="text-sm md:text-[15px] text-gray-600 leading-relaxed italic mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {languageFallback(data.description, lang)}
          </p>

          {/* Presented By */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">
              {lang === "en" ? "Presented By" : "प्रस्तुतकर्ता"}
            </p>

            <p className="text-sm font-semibold text-[var(--color-secondary)]">
              {languageFallback(data.presentedBy, lang)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Achievements = () => {
  const { lang } = useLanguage();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data.achievements);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Page Content */}
      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-14">
          {/* Page Title */}
          <div className="mb-6">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {lang === "en"
                ? "Institutional Achievements"
                : "संस्थागत उपलब्धियाँ"}
            </h1>
            <div className="w-full h-[2px] bg-[var(--color-primary)] mt-3 rounded" />
          </div>

          {/* Achievement Cards */}
          <div className="space-y-8">
            {achievements.map((item, i) => (
              <section key={item._id} className="show">
                <AchievementCard data={item} reverse={i % 2 !== 0} />
              </section>
            ))}
          </div>

          {/* Stats Row */}
          <section className="mt-10 show">
            <StatsBar />
          </section>
        </div>
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Achievements;
