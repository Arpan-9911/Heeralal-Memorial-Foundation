import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getPrograms } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const languageFallback = (textObj, lang) => {
  if (!textObj) return "";
  return textObj[lang] || textObj["en"] || textObj["hi"] || "";
};

/* ────────────────────────── POPUP MODAL ──────────────────────────────────── */

const ProgramModal = ({ program, onClose }) => {
  const { lang } = useLanguage();

  if (!program) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalSlideIn 0.3s ease-out" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-lg"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={`${BACKEND}/uploads/programs/${program.image}`}
            alt={languageFallback(program.name, lang)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-primary)] font-bold mb-1">
              {languageFallback(program.category, lang)}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {languageFallback(program.name, lang)}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Long Description */}
          {(program.longDescription?.en || program.longDescription?.hi) ? (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)] mb-3">
                {lang === "en" ? "About This Programme" : "इस कार्यक्रम के बारे में"}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {languageFallback(program.longDescription, lang)}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)] mb-3">
                {lang === "en" ? "About This Programme" : "इस कार्यक्रम के बारे में"}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {languageFallback(program.description, lang)}
              </p>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            {(program.location?.en || program.location?.hi) && (
              <div className="bg-[var(--color-primary-light)] rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
                    {lang === "en" ? "Location" : "स्थान"}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {languageFallback(program.location, lang)}
                </p>
              </div>
            )}

            {/* Centres */}
            {(program.centres?.en || program.centres?.hi) && (
              <div className="bg-[var(--color-primary-light)] rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏢</span>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
                    {lang === "en" ? "Centres" : "केंद्र"}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {languageFallback(program.centres, lang)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

/* ────────────────────────── PROGRAM CARD ──────────────────────────────────── */

const ProgramCard = ({ data, onReadMore }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={`${BACKEND}/uploads/programs/${data.image}`}
          alt={languageFallback(data.name, lang)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur-sm text-[var(--color-secondary)] px-3 py-1 rounded-full">
          {languageFallback(data.category, lang)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">
          {languageFallback(data.name, lang)}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
          {languageFallback(data.description, lang)}
        </p>

        <button
          onClick={() => onReadMore(data)}
          className="mt-4 self-start border-2 border-[var(--color-secondary)] text-[11px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-lg text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200"
        >
          {lang === "en" ? "Read More" : "और पढ़ें"}
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Programs = () => {
  const { lang } = useLanguage();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data.programs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrograms();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProgram) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProgram]);

  return (
    <div>
      <Navbar />

      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-14">
          {/* Page Title */}
          <div className="mb-8">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {lang === "en" ? "Our Key Programmes" : "हमारे प्रमुख कार्यक्रम"}
            </h1>
            <div className="w-full h-[2px] bg-[var(--color-primary)] mt-3 rounded" />
          </div>

          {/* Programs Grid — 2 per row */}
          <section className="show">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program) => (
                <ProgramCard
                  key={program._id}
                  data={program}
                  onReadMore={(p) => setSelectedProgram(p)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Programs;
