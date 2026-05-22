import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getTeams, getSettings } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const t = (obj, lang) => (obj && (obj[lang] || obj.en || obj.hi)) || "";

/* ────────────────── GOLDEN CIRCLE PHOTO ───────────────────────────────────── */

const GoldenCirclePhoto = ({ src, alt, size = "w-48 h-48 md:w-56 md:h-56" }) => (
  <div
    className={`relative ${size} rounded-full p-[4px] flex-shrink-0`}
    style={{
      background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 25%, #c9952c 50%, #fffbe6 75%, #d4a017 100%)",
      backgroundSize: "200% 200%",
      animation: "goldenShimmer 3s ease-in-out infinite",
      boxShadow: "0 0 24px rgba(212, 160, 23, 0.35)",
    }}
  >
    <div className="w-full h-full rounded-full p-[3px] bg-white">
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  </div>
);

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

/* ────────────────────── FOUNDING BODY CARD (Founder only) ──────────────────── */

const FoundingBodyCard = ({ member }) => {
  const { lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  if (!member) return null;

  const quote = t(member.quote, lang);
  const shortDesc = t(member.shortDescription, lang);
  const hasMessage = member.message?.en || member.message?.hi;

  return (
    <>
      <div className="bg-[var(--color-secondary)] border border-[var(--color-secondary-dark)] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left — Photo */}
          <div className="md:w-[280px] flex-shrink-0 bg-[var(--color-secondary-dark)] flex items-center justify-center p-6">
            <GoldenCirclePhoto
              src={`${BACKEND}/uploads/team/${member.photo}`}
              alt={t(member.name, lang)}
            />
          </div>

          {/* Right — Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            {/* Name & Role */}
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-[var(--color-primary)]">
              {t(member.role, lang)}
            </p>
            <h3 className="text-xl font-bold mb-4 text-white">
              {t(member.name, lang)}
            </h3>

            {/* Quote */}
            {quote && (
              <div className="border-l-3 border-[var(--color-primary)] pl-4 mb-4">
                <p
                  className="text-sm italic leading-relaxed text-gray-300"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  "{quote}"
                </p>
              </div>
            )}

            {/* Short Description */}
            {shortDesc && (
              <p className="text-xs leading-relaxed mb-4 text-gray-400">
                {shortDesc}
              </p>
            )}

            {/* Read More Button */}
            {hasMessage && (
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors duration-200 text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary-dark)]"
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
  if (!members || members.length === 0) return null;

  return (
    <div className="space-y-6">
      {members.map((member) => (
        <FoundingBodyCard key={member._id} member={member} />
      ))}
    </div>
  );
};

/* ────────────────────── LEADERSHIP CARD (2 per row, golden circle) ────────── */

const LeadershipCard = ({ member }) => {
  const { lang } = useLanguage();
  if (!member) return null;

  const quote = t(member.quote, lang);

  return (
    <div className="relative flex flex-col min-h-[140px] md:min-h-[160px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Top Half: Golden Background */}
      <div
        className="flex-1 flex flex-col justify-center pl-[110px] md:pl-[150px] pr-4 py-3"
        style={{
          background: "linear-gradient(135deg, #e5b842 0%, #f9eeb2 50%, #d4a017 100%)",
        }}
      >
        <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight">
          {t(member.name, lang)}
        </h3>
        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-800 font-bold mt-0.5">
          {t(member.role, lang)}
        </p>
      </div>

      {/* Bottom Half: White Background */}
      <div className="flex-1 flex items-center pl-[110px] md:pl-[150px] pr-4 py-3 bg-white">
        {quote ? (
          <p
            className="text-xs md:text-sm text-gray-600 italic leading-relaxed line-clamp-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "{quote}"
          </p>
        ) : (
          <p className="text-xs text-gray-400 italic">
            {lang === "en" ? "No quote available." : "कोई विचार उपलब्ध नहीं है।"}
          </p>
        )}
      </div>

      {/* Photo Centered Vertically on the Border Line */}
      <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10">
        <GoldenCirclePhoto
          src={`${BACKEND}/uploads/team/${member.photo}`}
          alt={t(member.name, lang)}
          size="w-20 h-20 md:w-24 h-24"
        />
      </div>
    </div>
  );
};

/* ────────────────────── LEADERSHIP SECTION ─────────────────────────────────── */

const LeadershipSection = ({ members }) => {
  if (!members || members.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {members.map((member) => (
        <LeadershipCard key={member._id} member={member} />
      ))}
    </div>
  );
};

/* ────────────────────── EXECUTION TEAM GRID ───────────────────────────────── */

const ExecutionTeamSection = ({ executionTeam, layout }) => {
  const { lang } = useLanguage();
  if (!executionTeam || executionTeam.length === 0) return null;

  // Build rows from layout array
  const rows = [];
  let index = 0;
  const effectiveLayout = layout && layout.length > 0 ? layout : [3];

  while (index < executionTeam.length) {
    // Use the defined row layout, or repeat the last value for extra members
    const rowIndex = rows.length;
    const cols = effectiveLayout[rowIndex] !== undefined
      ? effectiveLayout[rowIndex]
      : effectiveLayout[effectiveLayout.length - 1];
    const rowMembers = executionTeam.slice(index, index + cols);
    rows.push({ cols, members: rowMembers });
    index += cols;
  }

  return (
    <div className="space-y-5">
      {rows.map((row, rIdx) => (
        <div
          key={rIdx}
          className="grid gap-5"
          style={{ gridTemplateColumns: `repeat(${row.cols}, 1fr)` }}
        >
          {row.members.map((member) => (
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
      ))}
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
  const [founders, setFounders] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [executionTeam, setExecutionTeam] = useState([]);
  const [executionLayout, setExecutionLayout] = useState([3]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeams();
        setFounders(data.filter((m) => m.tier === "founder"));
        setLeaders(data.filter((m) => m.tier === "leader"));
        setExecutionTeam(data.filter((m) => m.tier === "execution"));
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    const fetchLayout = async () => {
      try {
        const data = await getSettings();
        if (data?.settings?.executionLayout?.length > 0) {
          setExecutionLayout(data.settings.executionLayout);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
    fetchLayout();
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

          {/* Founding Body (founders only) */}
          <section className="show mt-6">
            <FoundingBodySection members={founders} />
          </section>

          {/* Leadership (2 per row, golden circle, no popup) */}
          <section className="show mt-8">
            <LeadershipSection members={leaders} />
          </section>

          {/* Execution Team — custom row layout */}
          <section className="show mt-8">
            <ExecutionTeamSection executionTeam={executionTeam} layout={executionLayout} />
          </section>

          {/* CTA */}
          <section className="show mt-12">
            <JoinCTA />
          </section>
        </div>
      </div>

      {/* Golden Shimmer Keyframes */}
      <style>{`
        @keyframes goldenShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Teams;
