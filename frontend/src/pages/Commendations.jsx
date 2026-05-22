import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getCommendationCards } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const lang$ = (obj, lang) => {
  if (!obj) return "";
  return obj[lang] || obj["en"] || obj["hi"] || "";
};

/* ───────────── COMMENDATION CARD ───────────── */

const CommendationCard = ({ card, index }) => {
  const { lang } = useLanguage();
  const isEven = index % 2 === 0;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
      style={{ animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      {/* Decorative top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
        }}
      />

      <div className="bg-white flex flex-col md:flex-row items-stretch">
        {/* Left Photo */}
        <div
          className={`relative w-full md:w-48 lg:w-56 flex-shrink-0 overflow-hidden ${
            isEven ? "order-1" : "order-1 md:order-3"
          }`}
        >
          {card.leftPhoto ? (
            <>
              <img
                src={`${BACKEND}/uploads/commendation-cards/${card.leftPhoto}`}
                alt={lang$(card.byName, lang)}
                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/40 to-transparent md:bg-gradient-to-r" />
            </>
          ) : (
            <div className="w-full h-48 md:h-full bg-gradient-to-br from-[var(--color-primary-light)] to-gray-100 flex items-center justify-center">
              <span className="text-5xl opacity-30">👤</span>
            </div>
          )}
        </div>

        {/* Center Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center order-2 min-w-0">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-secondary)] leading-snug mb-3">
            {lang$(card.title, lang)}
          </h3>

          {/* Content / Message */}
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line line-clamp-6 mb-4">
            {lang$(card.content, lang)}
          </p>

          {/* Attribution */}
          {lang$(card.byName, lang) && (
            <div className="mt-auto pt-4 border-t border-gray-100">
              <p className="text-sm font-bold text-[var(--color-secondary)]">
                — {lang$(card.byName, lang)}
              </p>
              {lang$(card.byDesignation, lang) && (
                <p className="text-xs text-[var(--color-primary-dark)] mt-0.5 italic">
                  {lang$(card.byDesignation, lang)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Photo */}
        <div
          className={`relative w-full md:w-48 lg:w-56 flex-shrink-0 overflow-hidden ${
            isEven ? "order-3" : "order-3 md:order-1"
          }`}
        >
          {card.rightPhoto ? (
            <>
              <img
                src={`${BACKEND}/uploads/commendation-cards/${card.rightPhoto}`}
                alt="Certificate"
                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/40 to-transparent md:bg-gradient-to-l" />
            </>
          ) : (
            <div className="w-full h-48 md:h-full bg-gradient-to-br from-gray-100 to-[var(--color-primary-light)] flex items-center justify-center">
              <span className="text-5xl opacity-30">📜</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ───────────── MAIN PAGE ───────────── */

const Commendations = () => {
  const { lang } = useLanguage();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCommendationCards();
        setCards((data?.cards || []).filter((c) => c.active));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-secondary) 0%, #1a0a09 50%, var(--color-secondary) 100%)",
          }}
        />
        {/* Gold shimmer overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,160,23,0.15) 40px, rgba(212,160,23,0.15) 80px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold mb-3"
             style={{ color: "var(--color-primary)" }}>
            {lang === "en" ? "Institutional Patronage" : "संस्थागत संरक्षण"}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {lang === "en" ? "Commendations" : "प्रशंसापत्र"}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Formal recognitions and appreciations from esteemed dignitaries and institutional leaders."
              : "प्रतिष्ठित गणमान्य व्यक्तियों और संस्थागत नेताओं से औपचारिक मान्यता और सराहना।"}
          </p>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rotate-45" style={{ background: "var(--color-primary)" }} />
            <div className="w-12 h-[2px] bg-[var(--color-primary)]" />
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-sm text-gray-500">
              {lang === "en" ? "Loading commendations..." : "प्रशंसापत्र लोड हो रहे हैं..."}
            </div>
          ) : cards.length === 0 ? (
            <div className="text-center py-20 text-sm text-gray-500">
              {lang === "en"
                ? "No commendations available at this time."
                : "इस समय कोई प्रशंसापत्र उपलब्ध नहीं है।"}
            </div>
          ) : (
            <div className="space-y-8">
              {cards.map((card, index) => (
                <CommendationCard key={card._id} card={card} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Footer />
    </>
  );
};

export default Commendations;
