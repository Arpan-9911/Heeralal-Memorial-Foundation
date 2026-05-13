import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getTeams } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const t = (obj, lang) => (obj && (obj[lang] || obj.en || obj.hi)) || "";

/* ────────────────────── VERTICAL CONNECTOR ────────────────────────────────── */

const VerticalConnector = () => (
  <div className="flex justify-center py-6">
    <div className="w-[3px] h-14 bg-[var(--color-primary)] rounded" />
  </div>
);

/* ────────────────────── READ MORE MODAL ───────────────────────────────────── */

const ReadMoreModal = ({ open, onClose, member, lang }) => {
  if (!open || !member) return null;

  const designation = t(member.role, lang);
  const messageBody = t(member.message, lang);
  const signatureName = t(member.displayName, lang) || t(member.name, lang);
  const signatureDesignation = t(member.displayDesignation, lang) || designation;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-[fadeIn_0.3s_ease]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold transition z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="bg-[image:var(--gradient-secondary)] p-6 md:p-8 rounded-t-2xl">
          <p className="text-[var(--color-primary)] text-xs uppercase tracking-widest font-bold mb-1">
            {lang === "en" ? "Message from" : "संदेश"} {designation}
          </p>
          <h2 className="text-white text-lg md:text-xl font-bold">
            {t(member.name, lang)}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {messageBody ? (
            <p
              className="text-sm text-gray-700 leading-relaxed italic whitespace-pre-line"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              "{messageBody}"
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              {lang === "en" ? "No message available." : "कोई संदेश उपलब्ध नहीं है।"}
            </p>
          )}

          {/* Signature */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
            <div className="text-right">
              <p className="text-sm font-bold text-[var(--color-secondary)]">
                — {signatureName}
              </p>
              <p className="text-xs text-[var(--color-primary-dark)] italic">
                {signatureDesignation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ────────────────────── FOUNDING BODY CARD ─────────────────────────────────── */

const FoundingBodyCard = ({ member }) => {
  const { lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  if (!member) return null;

  const quote = t(member.quote, lang);
  const shortDesc = t(member.shortDescription, lang);
  const hasMessage = member.message?.en || member.message?.hi;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left — Photo */}
          <div className="md:w-[280px] flex-shrink-0 bg-[var(--color-primary-light)] flex items-center justify-center p-6">
            <div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{ boxShadow: "0 0 0 4px var(--color-primary), 0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <img
                src={`${BACKEND}/uploads/team/${member.photo}`}
                alt={t(member.name, lang)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            {/* Name & Role */}
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary-dark)] font-bold mb-1">
              {t(member.role, lang)}
            </p>
            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">
              {t(member.name, lang)}
            </h3>

            {/* Quote */}
            {quote && (
              <div className="border-l-3 border-[var(--color-primary)] pl-4 mb-4">
                <p
                  className="text-sm text-gray-600 italic leading-relaxed"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  "{quote}"
                </p>
              </div>
            )}

            {/* Short Description */}
            {shortDesc && (
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {shortDesc}
              </p>
            )}

            {/* Read More Button */}
            {hasMessage && (
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] border border-[var(--color-secondary)] px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200"
                >
                  {lang === "en" ? "Read More" : "और पढ़ें"}
                  <span className="text-sm">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ReadMoreModal open={showModal} onClose={() => setShowModal(false)} member={member} lang={lang} />
    </>
  );
};

/* ────────────────────── FOUNDING BODY SECTION ─────────────────────────────── */

const FoundingBodySection = ({ members }) => {
  const { lang } = useLanguage();
  if (!members || members.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-[0.25em] font-bold text-gray-800">
          {lang === "en" ? "Founding Body" : "संस्थापक निकाय"}
        </h2>
      </div>
      <div className="space-y-6">
        {members.map((member) => (
          <FoundingBodyCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
};

/* ────────────────────── EXECUTION TEAM GRID ───────────────────────────────── */

const ExecutionTeamSection = ({ executionTeam, gridCols }) => {
  const { lang } = useLanguage();
  if (!executionTeam || executionTeam.length === 0) return null;

  // Map gridCols to tailwind classes
  const gridClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  }[gridCols] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-[0.25em] font-bold text-gray-800">
          {lang === "en" ? "Our Execution Team" : "हमारी कार्यकारी टीम"}
        </h2>
      </div>

      <div className={`grid ${gridClass} gap-5`}>
        {executionTeam.map((member) => (
          <div
            key={member._id}
            className="relative rounded-lg overflow-hidden group cursor-pointer h-56"
          >
            <img
              src={`${BACKEND}/uploads/team/${member.photo}`}
              alt={t(member.name, lang)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-bold text-sm">
                {t(member.name, lang)}
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)] font-semibold">
                {t(member.role, lang)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ────────────────────── CTA SECTION ───────────────────────────────────────── */

const JoinCTA = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-[image:var(--gradient-secondary)] rounded-lg p-8 md:p-10 text-center shadow-lg">
      <h2
        className="text-white text-xl md:text-2xl font-bold italic mb-3"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {lang === "en" ? "Be Part of the Solution" : "समाधान का हिस्सा बनें"}
      </h2>
      <p className="text-gray-300 text-xs leading-relaxed max-w-xl mx-auto mb-6">
        {lang === "en"
          ? "The Heeralal Memorial Foundation is built on the collective effort of passionate professionals and volunteers. We invite you to join our team in institutionalizing compassion across India."
          : "हीरालाल मेमोरियल फाउंडेशन जुनूनी पेशेवरों और स्वयंसेवकों के सामूहिक प्रयास पर बना है। हम आपको पूरे भारत में करुणा को संस्थागत बनाने में हमारी टीम में शामिल होने के लिए आमंत्रित करते हैं।"}
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button className="bg-[var(--color-primary)] text-black text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded hover:bg-[var(--color-primary-dark)] hover:text-white transition-colors duration-200">
          {lang === "en" ? "Career Openings" : "करियर अवसर"}
        </button>
        <button className="border border-white text-white text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded hover:bg-white hover:text-[var(--color-secondary)] transition-colors duration-200">
          {lang === "en" ? "Volunteer Portal" : "स्वयंसेवक पोर्टल"}
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Teams = () => {
  const { lang } = useLanguage();
  const [foundingBody, setFoundingBody] = useState([]);
  const [executionTeam, setExecutionTeam] = useState([]);
  const [execGridCols, setExecGridCols] = useState(3);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeams();
        // Founding body = founders + leaders combined
        setFoundingBody(data.filter((m) => m.tier === "founder" || m.tier === "leader"));
        setExecutionTeam(data.filter((m) => m.tier === "execution"));
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchTeam();

    // Read grid cols from localStorage (synced with admin setting)
    const stored = parseInt(localStorage.getItem("hlmf_exec_grid_cols") || "3", 10);
    setExecGridCols(stored);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-14">
          {/* Page Title */}
          <div className="mb-2 text-center">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {lang === "en"
                ? "Organizational Hierarchy"
                : "संगठनात्मक संरचना"}
            </h1>
            <div className="w-40 h-[2px] bg-[var(--color-primary)] mt-3 mx-auto rounded" />
            <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
              {lang === "en"
                ? "Meet the dedicated individuals driving the Heeralal Memorial Foundation's mission of institutionalized compassion."
                : "हीरालाल मेमोरियल फाउंडेशन के संस्थागत करुणा के मिशन को आगे बढ़ाने वाले समर्पित व्यक्तियों से मिलें।"}
            </p>
          </div>

          {/* Founding Body */}
          <section className="show mt-6">
            <FoundingBodySection members={foundingBody} />
          </section>

          <VerticalConnector />

          {/* Execution Team */}
          <section className="show">
            <ExecutionTeamSection executionTeam={executionTeam} gridCols={execGridCols} />
          </section>

          {/* CTA */}
          <section className="show mt-12">
            <JoinCTA />
          </section>
        </div>
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Teams;
