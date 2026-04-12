import React from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const stats = [
  {
    id: 1,
    icon: "🎓",
    value: "15,000+",
    label: { en: "Students Empowered", hi: "छात्र सशक्त" },
  },
  {
    id: 2,
    icon: "🏡",
    value: "25+",
    label: { en: "Rural Villages Reached", hi: "ग्रामीण गांव पहुंचे" },
  },
  {
    id: 3,
    icon: "🏥",
    value: "5,000+",
    label: { en: "Medical Consultations", hi: "चिकित्सा परामर्श" },
  },
  {
    id: 4,
    icon: "🤝",
    value: "12+",
    label: { en: "MOU Partners", hi: "एमओयू साझेदार" },
  },
];

const achievements = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1974",
    title: {
      en: "Certificate of Excellence in Rural Education",
      hi: "ग्रामीण शिक्षा में उत्कृष्टता प्रमाणपत्र",
    },
    description: {
      en: '"Awarded for our \'Vidya Jyoti\' initiative which has successfully bridged the digital divide in the outer regions of Delhi-NCR within just one year of establishment."',
      hi: '"हमारी \'विद्या ज्योति\' पहल के लिए सम्मानित, जिसने स्थापना के मात्र एक वर्ष में दिल्ली-एनसीआर के बाहरी क्षेत्रों में डिजिटल विभाजन को सफलतापूर्वक पाटा है।"',
    },
    presentedBy: {
      en: "Presented by: National Education Council (2024)",
      hi: "प्रस्तुतकर्ता: राष्ट्रीय शिक्षा परिषद (2024)",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
    title: {
      en: "Community Health Impact Pioneer",
      hi: "सामुदायिक स्वास्थ्य प्रभाव अग्रणी",
    },
    description: {
      en: '"Recognition for the \'Swasthya Seva\' mobile clinic model which provided emergency healthcare services to over 5,000 individuals in under-served clusters."',
      hi: '"\'स्वास्थ्य सेवा\' मोबाइल क्लिनिक मॉडल के लिए मान्यता, जिसने वंचित क्लस्टरों में 5,000 से अधिक व्यक्तियों को आपातकालीन स्वास्थ्य सेवाएं प्रदान कीं।"',
    },
    presentedBy: {
      en: "Presented by: Delhi Health & Welfare Board",
      hi: "प्रस्तुतकर्ता: दिल्ली स्वास्थ्य एवं कल्याण बोर्ड",
    },
  },
];

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const StatsBar = () => {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {item.value}
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1">
            {item.label[lang]}
          </p>
        </div>
      ))}
    </div>
  );
};

const AchievementCard = ({ data, reverse }) => {
  const { lang } = useLanguage();

  const imageBlock = (
    <div className="overflow-hidden rounded-lg">
      <img
        src={data.image}
        alt={data.title[lang]}
        className="w-full h-56 md:h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h3 className="text-sm md:text-base uppercase tracking-wider font-bold text-[var(--color-secondary)] mb-4">
        {data.title[lang]}
      </h3>
      <p
        className="text-sm text-gray-600 italic leading-relaxed mb-4"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {data.description[lang]}
      </p>
      <p className="text-xs text-[var(--color-secondary)] font-medium">
        {data.presentedBy[lang]}
      </p>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center ${
          reverse ? "" : ""
        }`}
      >
        {reverse ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Achievements = () => {
  const { lang } = useLanguage();

  return (
    <div>
      <Navbar />

      {/* Page Content */}
      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-14">
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

          {/* Stats Row */}
          <section className="mb-10 show">
            <StatsBar />
          </section>

          {/* Achievement Cards */}
          <div className="space-y-8">
            {achievements.map((item, i) => (
              <section key={item.id} className="show">
                <AchievementCard data={item} reverse={i % 2 !== 0} />
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Achievements;
