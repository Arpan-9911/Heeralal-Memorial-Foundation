import React, { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getAboutUs } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

/* ──────────────────────────────────── FALLBACK DATA ──────────────────────────────────── */

const defaultLegacy = {
  title: { en: "Our Institutional Roots", hi: "हमारी संस्थागत जड़ें" },
  paragraphs: [
    {
      en: "Established on June 29, 2023, the Heeralal Memorial Foundation (HLMF) was founded in the memory of Shri Heeralal Ji, whose life was dedicated to community service and educational upliftment.",
      hi: "29 जून 2023 को स्थापित, हीरालाल मेमोरियल फाउंडेशन (HLMF) श्री हीरालाल जी की स्मृति में स्थापित किया गया, जिनका जीवन सामुदायिक सेवा और शैक्षिक उत्थान को समर्पित था।",
    },
    {
      en: "Headquartered in New Delhi, HLMF operates as a Section 8 non-profit organization focused on institutionalizing social welfare through data driven and sustainable interventions. Since our inception, we have strived to bridge the divide between government policies and grassroots reality.",
      hi: "नई दिल्ली में मुख्यालय, HLMF एक धारा 8 गैर-लाभकारी संगठन के रूप में कार्य करता है जो डेटा-संचालित और टिकाऊ हस्तक्षेपों के माध्यम से सामाजिक कल्याण को संस्थागत बनाने पर केंद्रित है। अपनी स्थापना के बाद से, हमने सरकारी नीतियों और जमीनी हकीकत के बीच की खाई को पाटने का प्रयास किया है।",
    },
  ],
  images: [],
};

const defaultVision = {
  subtitle: { en: "Our Ultimate Goal", hi: "हमारा परम लक्ष्य" },
  title: { en: "Vision Statement", hi: "दृष्टि वक्तव्य" },
  quote: {
    en: '"To bridge the gap of inequality by providing institutional support to the most vulnerable sections of society, ensuring sustainable growth and holistic empowerment across the nation."',
    hi: '"समाज के सबसे कमजोर वर्गों को संस्थागत सहायता प्रदान करके असमानता की खाई को पाटना, राष्ट्र भर में सतत विकास और समग्र सशक्तिकरण सुनिश्चित करना।"',
  },
  missionTitle: { en: "Our Mission", hi: "हमारा मिशन" },
  missionDesc: {
    en: "To institutionalize compassion through structured programs in education, healthcare, and livelihood, leveraging technology and collaboration to maximize social impact.",
    hi: "शिक्षा, स्वास्थ्य सेवा और आजीविका में संरचित कार्यक्रमों के माध्यम से करुणा को संस्थागत बनाना, सामाजिक प्रभाव को अधिकतम करने के लिए प्रौद्योगिकी और सहयोग का लाभ उठाना।",
  },
  objectiveTitle: { en: "Core Objective", hi: "मूल उद्देश्य" },
  objectiveDesc: {
    en: "Moving beyond temporary relief to permanent systemic empowerment, creating self-reliant communities that contribute to national building.",
    hi: "अस्थायी राहत से आगे बढ़कर स्थायी प्रणालीगत सशक्तिकरण, आत्मनिर्भर समुदाय बनाना जो राष्ट्र निर्माण में योगदान दें।",
  },
};

const defaultCoreValues = [
  { icon: "🏛️", title: { en: "Integrity", hi: "सत्यनिष्ठा" }, desc: { en: "Upholding the highest standards of transparency in every transaction and initiative.", hi: "हर लेनदेन और पहल में पारदर्शिता के उच्चतम मानकों को बनाए रखना।" } },
  { icon: "✊", title: { en: "Empowerment", hi: "सशक्तिकरण" }, desc: { en: "Moving beyond charity to build enduring self-reliance and dignity.", hi: "दान से आगे बढ़कर स्थायी आत्मनिर्भरता और गरिमा का निर्माण।" } },
  { icon: "🤝", title: { en: "Inclusivity", hi: "समावेशिता" }, desc: { en: "Ensuring no individual is left behind regardless of caste, creed, or gender.", hi: "जाति, पंथ या लिंग की परवाह किए बिना किसी भी व्यक्ति को पीछे न छोड़ना।" } },
  { icon: "📊", title: { en: "Efficiency", hi: "दक्षता" }, desc: { en: "Maximizing the impact of every rupee through institutional rigor.", hi: "संस्थागत कठोरता के माध्यम से हर रुपये के प्रभाव को अधिकतम करना।" } },
];

const defaultGovernance = {
  title: { en: "Governance Structure", hi: "शासन संरचना" },
  description: {
    en: "The foundation is governed by a diverse Board of Trustees that provides strategic oversight and ensures adherence to our founding principles.",
    hi: "फाउंडेशन एक विविध न्यासी बोर्ड द्वारा शासित है जो रणनीतिक निरीक्षण प्रदान करता है और हमारे संस्थापक सिद्धांतों के पालन को सुनिश्चित करता है।",
  },
  headers: {
    en: ["Body Name", "Frequency of Meeting", "Core Responsibility"],
    hi: ["निकाय का नाम", "बैठक की आवृत्ति", "मुख्य जिम्मेदारी"],
  },
  rows: [
    { body: { en: "Board of Trustees", hi: "न्यासी बोर्ड" }, frequency: { en: "Quarterly", hi: "त्रैमासिक" }, responsibility: { en: "Strategic Direction & Fiduciary Oversight", hi: "रणनीतिक दिशा और न्यासी निरीक्षण" } },
    { body: { en: "Executive Committee", hi: "कार्यकारी समिति" }, frequency: { en: "Monthly", hi: "मासिक" }, responsibility: { en: "Operational Execution & Program Management", hi: "परिचालन निष्पादन और कार्यक्रम प्रबंधन" } },
    { body: { en: "Audit Committee", hi: "ऑडिट समिति" }, frequency: { en: "Bi-Annual", hi: "अर्धवार्षिक" }, responsibility: { en: "Financial Integrity & Compliance Review", hi: "वित्तीय अखंडता और अनुपालन समीक्षा" } },
  ],
};

const defaultCompliance = {
  title: { en: "Regulatory Compliance", hi: "नियामक अनुपालन" },
  description: {
    en: "HLMF is fully registered and compliant with the following statutory requirements of the Government of India:",
    hi: "HLMF भारत सरकार की निम्नलिखित वैधानिक आवश्यकताओं के साथ पूरी तरह से पंजीकृत और अनुपालन करता है:",
  },
  items: [
    { en: "Section 12A Registration", hi: "धारा 12A पंजीकरण" },
    { en: "Section 80G Donor Tax Exemption", hi: "धारा 80G दाता कर छूट" },
    { en: "NITI Aayog Darpan Portal Listing", hi: "नीति आयोग दर्पण पोर्टल सूची" },
    { en: "Corporate Social Responsibility (CSR) Eligible", hi: "कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR) पात्र" },
  ],
  cards: [
    { title: { en: "Transparency Pledge", hi: "पारदर्शिता प्रतिज्ञा" }, desc: { en: "Our annual financial reports are subjected to independent third-party audits to maintain the highest level of trust with our stakeholders and donors.", hi: "हमारी वार्षिक वित्तीय रिपोर्टें स्वतंत्र तृतीय-पक्ष ऑडिट के अधीन हैं ताकि हमारे हितधारकों और दाताओं के साथ उच्चतम स्तर का विश्वास बनाए रखा जा सके।" } },
    { title: { en: "Ethics Hotline", hi: "नैतिकता हॉटलाइन" }, desc: { en: "We maintain a dedicated compliance cell for whistleblowing and ethical grievances to ensure zero tolerance for mismanagement.", hi: "हम कुप्रबंधन के लिए शून्य सहिष्णुता सुनिश्चित करने के लिए व्हिसलब्लोइंग और नैतिक शिकायतों के लिए एक समर्पित अनुपालन सेल बनाए रखते हैं।" } },
  ],
};

const tabs = [
  { id: "legacy", label: { en: "Institutional Legacy", hi: "संस्थागत विरासत" } },
  { id: "vision", label: { en: "Vision & Mission", hi: "दृष्टि एवं मिशन" } },
  { id: "values", label: { en: "Core Values", hi: "मूल मूल्य" } },
  { id: "governance", label: { en: "Governance", hi: "शासन" } },
  { id: "compliance", label: { en: "Compliance & Audit", hi: "अनुपालन एवं ऑडिट" } },
];

/* ────────────────────────── HELPERS ─────────────────────────── */

const fallbackImg = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1974";
const t = (obj, lang) => (obj && (obj[lang] || obj["en"] || obj["hi"])) || "";

/* ────────────────────────── DECORATIVE ─────────────────────────── */

const Watermark = () => null;

const PageStamp = () => {
  const { lang } = useLanguage();
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
      <div className="w-12 h-12 rounded bg-gray-200 opacity-40" />
      <p className="text-[11px] text-gray-400 tracking-wider uppercase italic">
        {lang === "en"
          ? "Heeralal Memorial Foundation · ESTD. 2023"
          : "हीरालाल मेमोरियल फाउंडेशन · स्था. 2023"}
      </p>
    </div>
  );
};

/* ────────────────────────── TAB CONTENT SECTIONS ─────────────────────────── */

const InstitutionalLegacy = ({ data }) => {
  const { lang } = useLanguage();
  const d = data || defaultLegacy;

  // Single legacy image: check images array, else fallback
  const legacyImage = d.images && d.images.length > 0
    ? `${BACKEND}/uploads/about/${d.images[0]}`
    : "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1974";

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
      <Watermark />
      <h2
        className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic mb-6"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {t(d.title, lang)}
      </h2>

      <div className="space-y-4 mb-8">
        {(d.paragraphs || []).map((p, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed">
            {t(p, lang)}
          </p>
        ))}
      </div>

      {/* Premium Vignette & Ornamental Frame */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-3xl overflow-hidden bg-white p-2">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] overflow-hidden">
            {/* The Image */}
            <img
              src={legacyImage}
              alt={t(d.title, lang)}
              className="w-full h-full object-cover select-none"
            />
            
            {/* Vignette Overlay (Top, Left, Right and general fade) */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-95 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-95 pointer-events-none"></div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, transparent 15%, rgba(255, 255, 255, 0.4) 55%, rgba(255, 255, 255, 0.95) 85%, rgba(255, 255, 255, 1) 98%)",
              }}
            />
            
            {/* Bottom Border Line */}
            <div className="absolute bottom-[12%] left-[10%] right-[10%] h-[1px] bg-[#6B1D2F]/60 pointer-events-none"></div>
            
            {/* Left Corner Flourish */}
            <div className="absolute bottom-[12%] left-[8%] w-20 h-10 -mb-[8px] text-[#6B1D2F]/80 pointer-events-none">
              <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="xMinYMax meet">
                <path
                  d="M 5 48 C 15 48, 25 46, 25 38 C 25 30, 12 28, 8 36 C 4 44, 18 50, 28 43 C 38 36, 30 20, 18 18 C 10 16, 4 26, 12 32 C 18 36, 24 32, 22 26 C 20 20, 12 22, 14 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Right Corner Flourish (Mirrored) */}
            <div className="absolute bottom-[12%] right-[8%] w-20 h-10 -mb-[8px] text-[#6B1D2F]/80 pointer-events-none transform scale-x-[-1]">
              <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="xMinYMax meet">
                <path
                  d="M 5 48 C 15 48, 25 46, 25 38 C 25 30, 12 28, 8 36 C 4 44, 18 50, 28 43 C 38 36, 30 20, 18 18 C 10 16, 4 26, 12 32 C 18 36, 24 32, 22 26 C 20 20, 12 22, 14 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <PageStamp />
    </div>
  );
};

const VisionMission = ({ data }) => {
  const { lang } = useLanguage();
  const d = data || defaultVision;

  // Extract multiple vision images
  const visionImages = d.images && d.images.length > 0
    ? d.images.map((img) => `${BACKEND}/uploads/about/${img}`)
    : [];

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
      <Watermark />

      {/* Vision Banner */}
      <div className="relative rounded-lg overflow-hidden bg-[image:var(--gradient-secondary)] p-8 md:p-12 mb-8">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1972" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <p className="text-[var(--color-primary)] text-xs uppercase tracking-widest font-bold mb-2">
            {t(d.subtitle, lang)}
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            {t(d.title, lang)}
          </h2>
          <p className="text-gray-200 italic text-sm md:text-base leading-relaxed max-w-3xl" style={{ fontFamily: "'Georgia', serif" }}>
            {t(d.quote, lang)}
          </p>
        </div>
      </div>

      {/* Mission + Objective Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          { title: d.missionTitle, desc: d.missionDesc },
          { title: d.objectiveTitle, desc: d.objectiveDesc },
        ].map((item, i) => (
          <div key={i} className="border-l-4 border-[var(--color-primary)] pl-5 py-2">
            <h3 className="text-sm uppercase tracking-wider font-bold text-[var(--color-secondary)] mb-2">
              {t(item.title, lang)}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(item.desc, lang)}
            </p>
          </div>
        ))}
      </div>

      {/* Vision Images Gallery */}
      {visionImages.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)] mb-4 border-b border-gray-100 pb-2">
            {lang === "en" ? "Gallery & Action" : "गैलरी और गतिविधियाँ"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visionImages.map((imgUrl, idx) => {
              const spanClass = visionImages.length > 1 && idx === 0 ? "sm:col-span-2 sm:row-span-2" : "";
              const heightClass = visionImages.length > 1 && idx === 0 ? "h-64 sm:h-[340px]" : "h-48 sm:h-40 md:h-44";
              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group ${spanClass}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Vision Gallery ${idx + 1}`}
                    className={`w-full ${heightClass} object-cover group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium">
                      {lang === "en" ? `HLMF Initiative ${idx + 1}` : `HLMF पहल ${idx + 1}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : d.image ? (
        /* Fallback to original single image */
        <div className="w-full -mx-6 md:-mx-10 w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] mt-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/about/${d.image}`}
            alt="Vision & Mission"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      ) : null}

      <PageStamp />
    </div>
  );
};

const CoreValues = ({ data }) => {
  const { lang } = useLanguage();
  const d = data && data.length > 0 ? data : defaultCoreValues;

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
      <Watermark />
      <h2
        className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic mb-8"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {lang === "en" ? "Pillars of Character" : "चरित्र के स्तंभ"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {d.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-5 rounded-lg border border-gray-100 bg-[var(--color-bg)] hover:shadow-md transition-shadow duration-300">
            <div className="text-3xl flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-secondary)] mb-1">{t(item.title, lang)}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t(item.desc, lang)}</p>
            </div>
          </div>
        ))}
      </div>

      <PageStamp />
    </div>
  );
};

const Governance = ({ data }) => {
  const { lang } = useLanguage();
  const d = data || defaultGovernance;
  const headers = defaultGovernance.headers;

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
      <Watermark />
      <h2
        className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic mb-4"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {t(d.title, lang)}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-8">
        {t(d.description, lang)}
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-secondary)] text-white">
              {headers[lang].map((h, i) => (
                <th key={i} className="text-left text-xs uppercase tracking-wider font-semibold px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(d.rows || []).map((row, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="px-5 py-3 font-medium text-gray-800">{t(row.body, lang)}</td>
                <td className="px-5 py-3 text-gray-600">{t(row.frequency, lang)}</td>
                <td className="px-5 py-3 text-gray-600">{t(row.responsibility, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PageStamp />
    </div>
  );
};

const ComplianceAudit = ({ data }) => {
  const { lang } = useLanguage();
  const d = data || defaultCompliance;

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
      <Watermark />

      <div className="border-l-4 border-[var(--color-primary)] pl-5 mb-6">
        <h2
          className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {t(d.title, lang)}
        </h2>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        {t(d.description, lang)}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {(d.items || []).map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 rounded border border-gray-100 bg-[var(--color-bg)]">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{t(item, lang)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(d.cards || []).map((card, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--color-secondary)] mb-3">{t(card.title, lang)}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t(card.desc, lang)}</p>
          </div>
        ))}
      </div>

      <PageStamp />
    </div>
  );
};

/* ────────────────────────── TAB NAVIGATION ────────────────────────────────── */

const TabBar = ({ activeTab, setActiveTab }) => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[44px] z-40 mt-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-[var(--color-secondary)] text-white shadow-md"
                    : "text-gray-600 hover:text-[var(--color-secondary)] hover:bg-gray-100"
                }
              `}
            >
              {tab.label[lang]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const About = () => {
  const [activeTab, setActiveTab] = useState("legacy");
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    getAboutUs()
      .then((res) => {
        if (res.aboutUs) setAboutData(res.aboutUs);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "legacy":
        return <InstitutionalLegacy data={aboutData?.legacy} />;
      case "vision":
        return <VisionMission data={aboutData?.vision} />;
      case "values":
        return <CoreValues data={aboutData?.coreValues} />;
      case "governance":
        return <Governance data={aboutData?.governance} />;
      case "compliance":
        return <ComplianceAudit data={aboutData?.compliance} />;
      default:
        return <InstitutionalLegacy data={aboutData?.legacy} />;
    }
  };

  return (
    <div>
      <Navbar />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Gold accent line under tabs */}
      <div className="h-[3px] bg-[var(--color-primary)]" />

      {/* Tab Content */}
      <section className="bg-[var(--color-primary-light)] min-h-[60vh] show">
        <div className="max-w-6xl mx-auto px-4 md:py-10 py-4">
          {renderTab()}
        </div>
      </section>

      <Footer topBg="bg-[var(--color-primary-light)]" />
    </div>
  );
};

export default About;