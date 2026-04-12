import React from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const programs = [
  {
    id: 1,
    category: { en: "Education", hi: "शिक्षा" },
    name: { en: "Vidya Jyoti", hi: "विद्या ज्योति" },
    description: {
      en: "Providing scholarships and digital literacy to rural students in North India.",
      hi: "उत्तर भारत के ग्रामीण छात्रों को छात्रवृत्ति और डिजिटल साक्षरता प्रदान करना।",
    },
  },
  {
    id: 2,
    category: { en: "Healthcare", hi: "स्वास्थ्य सेवा" },
    name: { en: "Swasthya Seva", hi: "स्वास्थ्य सेवा" },
    description: {
      en: "Mobile health clinics and sanitation awareness drives in urban slums.",
      hi: "शहरी झुग्गियों में मोबाइल स्वास्थ्य क्लीनिक और स्वच्छता जागरूकता अभियान।",
    },
  },
  {
    id: 3,
    category: { en: "Women Empowerment", hi: "महिला सशक्तिकरण" },
    name: { en: "Shakti Pariyojana", hi: "शक्ति परियोजना" },
    description: {
      en: "Skill development and vocational training for financial independence.",
      hi: "वित्तीय स्वतंत्रता के लिए कौशल विकास और व्यावसायिक प्रशिक्षण।",
    },
  },
  {
    id: 4,
    category: { en: "Sustainability", hi: "स्थिरता" },
    name: { en: "Paryavaran Raksha", hi: "पर्यावरण रक्षा" },
    description: {
      en: "Tree plantation and water harvesting projects in water-scarce regions.",
      hi: "जल-दुर्लभ क्षेत्रों में वृक्षारोपण और जल संचयन परियोजनाएँ।",
    },
  },
  {
    id: 5,
    category: { en: "Livelihood", hi: "आजीविका" },
    name: { en: "Yuva Skillup", hi: "युवा स्किलअप" },
    description: {
      en: "Industry-aligned job training for unemployed youth in Delhi-NCR.",
      hi: "दिल्ली-एनसीआर में बेरोजगार युवाओं के लिए उद्योग-संरेखित नौकरी प्रशिक्षण।",
    },
  },
  {
    id: 6,
    category: { en: "Food Security", hi: "खाद्य सुरक्षा" },
    name: { en: "Aahaar Vitaran", hi: "आहार वितरण" },
    description: {
      en: "Nutritional support programmes for primary school children.",
      hi: "प्राथमिक विद्यालय के बच्चों के लिए पोषण सहायता कार्यक्रम।",
    },
  },
];

/* ────────────────────────── PROGRAM CARD ──────────────────────────────────── */

const ProgramCard = ({ data }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-secondary)] mb-1">
          {data.category[lang]}
        </p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
          {data.name[lang]}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {data.description[lang]}
        </p>
      </div>

      <button className="mt-5 self-start border border-gray-800 text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded hover:bg-[var(--color-secondary)] hover:text-white hover:border-[var(--color-secondary)] transition-colors duration-200">
        {lang === "en" ? "View Detailed Report" : "विस्तृत रिपोर्ट देखें"}
      </button>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Programs = () => {
  const { lang } = useLanguage();

  return (
    <div>
      <Navbar />

      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-14">
          {/* Page Title */}
          <div className="mb-6">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {lang === "en" ? "Our Key Programmes" : "हमारे प्रमुख कार्यक्रम"}
            </h1>
            <div className="w-full h-[2px] bg-[var(--color-primary)] mt-3 rounded" />
          </div>

          {/* Programs Grid */}
          <section className="show">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.id} data={program} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Programs;
