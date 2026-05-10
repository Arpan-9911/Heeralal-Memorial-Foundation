import React from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const founder = {
  name: { en: "Late Shri Heeralal Ji", hi: "स्वर्गीय श्री हीरालाल जी" },
  role: { en: "Institutional Founder", hi: "संस्थागत संस्थापक" },
  photo:
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
  quote: {
    en: '"The foundation of any society rests upon the strength of its character and the depth of its compassion. My life\'s mission has been to ignite hope where it is most needed."',
    hi: '"किसी भी समाज की नींव उसके चरित्र की मजबूती और उसकी करुणा की गहराई पर टिकी होती है। मेरे जीवन का मिशन वहाँ आशा जगाना रहा है जहाँ इसकी सबसे अधिक आवश्यकता है।"',
  },
  quoteAttribution: {
    en: "— The Founder's Eternal Vision",
    hi: "— संस्थापक की शाश्वत दृष्टि",
  },
};

const leaders = [
  {
    id: 1,
    name: { en: "Dr. Preeti Singh", hi: "डॉ. प्रीति सिंह" },
    role: { en: "Managing Director", hi: "प्रबंध निदेशक" },
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    quote: {
      en: '"We don\'t just provide aid, we build sustainable ecosystems for growth. Our institutional approach ensures that every contribution creates a ripple effect of empowerment."',
      hi: '"हम केवल सहायता प्रदान नहीं करते, हम विकास के लिए टिकाऊ पारिस्थितिकी तंत्र का निर्माण करते हैं। हमारा संस्थागत दृष्टिकोण सुनिश्चित करता है कि हर योगदान सशक्तिकरण की तरंग पैदा करे।"',
    },
  },
  {
    id: 2,
    name: { en: "Mr. Arjun Malhotra", hi: "श्री अर्जुन मल्होत्रा" },
    role: { en: "Director of Finance", hi: "वित्त निदेशक" },
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    quote: {
      en: '"Innovation in social service is not an option, it is a necessity. By leveraging modern methodologies, we honor our roots while reaching for a brighter future."',
      hi: '"सामाजिक सेवा में नवाचार एक विकल्प नहीं, एक आवश्यकता है। आधुनिक पद्धतियों का लाभ उठाकर, हम अपनी जड़ों का सम्मान करते हुए एक उज्जवल भविष्य की ओर बढ़ते हैं।"',
    },
  },
];

const executionTeam = [
  {
    id: 1,
    name: { en: "Mr. Rajesh Gupta", hi: "श्री राजेश गुप्ता" },
    role: { en: "Chief Technical Officer", hi: "मुख्य तकनीकी अधिकारी" },
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
  },
  {
    id: 2,
    name: { en: "Ms. Anjali Sharma", hi: "सुश्री अंजलि शर्मा" },
    role: { en: "Head of Education", hi: "शिक्षा प्रमुख" },
    photo:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600",
  },
  {
    id: 3,
    name: { en: "Dr. Vivek Mehra", hi: "डॉ. विवेक मेहरा" },
    role: { en: "Medical Coordinator", hi: "चिकित्सा समन्वयक" },
    photo:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=600",
  },
  {
    id: 4,
    name: { en: "Ms. Sunita Rao", hi: "सुश्री सुनीता राव" },
    role: { en: "Field Operations Head", hi: "क्षेत्र संचालन प्रमुख" },
    photo:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=600",
  },
  {
    id: 5,
    name: { en: "Mr. Vikram Sethi", hi: "श्री विक्रम सेठी" },
    role: { en: "Operations Lead", hi: "संचालन प्रमुख" },
    photo:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600",
  },
  {
    id: 6,
    name: { en: "Ms. Kavita Jain", hi: "सुश्री कविता जैन" },
    role: { en: "Legal Advisor", hi: "विधि सलाहकार" },
    photo:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
  },
];

/* ────────────────────── VERTICAL CONNECTOR ────────────────────────────────── */

const VerticalConnector = () => (
  <div className="flex justify-center py-6">
    <div className="w-[3px] h-14 bg-[var(--color-primary)] rounded" />
  </div>
);

/* ────────────────────── FOUNDER SECTION ───────────────────────────────────── */

const FounderSection = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-[image:var(--gradient-secondary)] rounded-lg p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Founder Photo */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-full border-4 border-gray-400 overflow-hidden grayscale">
            <img
              src={founder.photo}
              alt={founder.name[lang]}
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
            {founder.quote[lang]}
          </p>
          <p className="text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider text-right">
            {founder.quoteAttribution[lang]}
          </p>
        </div>
      </div>

      {/* Name + Role */}
      <div className="mt-4 md:ml-0">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          {founder.role[lang]}
        </p>
        <h3 className="text-white font-bold text-base">
          {founder.name[lang]}
        </h3>
      </div>
    </div>
  );
};

/* ────────────────────── LEADERSHIP CARDS ──────────────────────────────────── */

const LeadershipSection = () => {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {leaders.map((leader) => (
        <div
          key={leader.id}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Header: Photo + Name */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full border-2 border-[var(--color-primary)] overflow-hidden flex-shrink-0">
              <img
                src={leader.photo}
                alt={leader.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary-dark)] font-semibold">
                {leader.role[lang]}
              </p>
              <h3 className="text-sm font-bold text-gray-900">
                {leader.name[lang]}
              </h3>
            </div>
          </div>

          {/* Quote */}
          <p
            className="text-xs text-gray-600 italic leading-relaxed"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {leader.quote[lang]}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ────────────────────── EXECUTION TEAM GRID ───────────────────────────────── */

const ExecutionTeamSection = () => {
  const { lang } = useLanguage();

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
            key={member.id}
            className="relative rounded-lg overflow-hidden group cursor-pointer h-56"
          >
            {/* Background Image */}
            <img
              src={member.photo}
              alt={member.name[lang]}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Name + Role */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-bold text-sm">
                {member.name[lang]}
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)] font-semibold">
                {member.role[lang]}
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
            <FounderSection />
          </section>

          <VerticalConnector />

          {/* Leadership */}
          <section className="show">
            <LeadershipSection />
          </section>

          <VerticalConnector />

          {/* Execution Team */}
          <section className="show">
            <ExecutionTeamSection />
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
