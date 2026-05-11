import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getTeams } from "../api";

/* ────────────────────── VERTICAL CONNECTOR ────────────────────────────────── */

const VerticalConnector = () => (
  <div className="flex justify-center py-6">
    <div className="w-[3px] h-14 bg-[var(--color-primary)] rounded" />
  </div>
);

/* ────────────────────── FOUNDER SECTION ───────────────────────────────────── */

const FounderSection = ({ founder }) => {
  const { lang } = useLanguage();
  if(!founder) return null;

  return (
    <div className="bg-[image:var(--gradient-secondary)] rounded-lg p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Founder Photo */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-full border-4 border-gray-400 overflow-hidden grayscale">
            <img
              src={import.meta.env.VITE_BACKEND_URL + "/uploads/team/" + founder.photo}
              alt={founder.name[lang] + " photo"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="flex-1">
          <p
            className="text-gray-200 text-sm italic leading-relaxed mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {founder.quote[lang] || (lang === "en" ? "No quote available." : "कोई उद्धरण उपलब्ध नहीं है।")}
          </p>
        </div>
      </div>

      {/* Name + Role */}
      <div className="mt-4 md:ml-0">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          {founder.role[lang] || (lang === "en" ? "Founder" : "संस्थापक")}
        </p>
        <h3 className="text-white font-bold text-base">
          {founder.name[lang] || (lang === "en" ? "No name available." : "कोई नाम उपलब्ध नहीं है।")}
        </h3>
      </div>
    </div>
  );
};

/* ────────────────────── LEADERSHIP CARDS ──────────────────────────────────── */

const LeadershipSection = ({ leaders }) => {
  const { lang } = useLanguage();
  if(!leaders) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {leaders.map((leader) => (
        <div
          key={leader._id}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Header: Photo + Name */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full border-2 border-[var(--color-primary)] overflow-hidden flex-shrink-0">
              <img
                src={import.meta.env.VITE_BACKEND_URL + "/uploads/team/" + leader.photo}
                alt={leader.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary-dark)] font-semibold">
                {leader.role[lang] || (lang === "en" ? "Role not available." : "कोई भूमिका उपलब्ध नहीं है।")}
              </p>
              <h3 className="text-sm font-bold text-gray-900">
                {leader.name[lang] || (lang === "en" ? "Name not available." : "कोई नाम उपलब्ध नहीं है।")}
              </h3>
            </div>
          </div>

          {/* Quote */}
          <p
            className="text-xs text-gray-600 italic leading-relaxed"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {leader.quote[lang] || (lang === "en" ? "No quote available." : "कोई उद्धरण उपलब्ध नहीं है।")}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ────────────────────── EXECUTION TEAM GRID ───────────────────────────────── */

const ExecutionTeamSection = ({ executionTeam }) => {
  const { lang } = useLanguage();
  if(!executionTeam) return null;

  return (
    <div>
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-[0.25em] font-bold text-gray-800">
          {lang === "en" ? "Our Execution Team" : "हमारी कार्यकारी टीम"}
        </h2>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {executionTeam.map((member) => (
          <div
            key={member._id}
            className="relative rounded-lg overflow-hidden group cursor-pointer h-56"
          >
            {/* Background Image */}
            <img
              src={import.meta.env.VITE_BACKEND_URL + "/uploads/team/" + member.photo}
              alt={member.name[lang] + " photo"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Name + Role */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-bold text-sm">
                {member.name[lang] || (lang === "en" ? "Name not available." : "कोई नाम उपलब्ध नहीं है।")}
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)] font-semibold">
                {member.role[lang] || (lang === "en" ? "Role not available." : "कोई भूमिका उपलब्ध नहीं है।")}
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
  const [founder, setFounder] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [executionTeam, setExecutionTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeams();
        setFounder(data.find((member) => member.tier === "founder"));
        setLeaders(data.filter((member) => member.tier === "leader"));
        setExecutionTeam(data.filter((member) => member.tier === "execution"));
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchTeam();
  }, []);

  if (!founder || !leaders || !executionTeam) return null;

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

          {/* Founder */}
          <section className="show mt-6">
            <FounderSection founder={founder} />
          </section>

          <VerticalConnector />

          {/* Leadership */}
          <section className="show">
            <LeadershipSection leaders={leaders} />
          </section>

          <VerticalConnector />

          {/* Execution Team */}
          <section className="show">
            <ExecutionTeamSection executionTeam={executionTeam} />
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
