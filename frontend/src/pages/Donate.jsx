import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const heroData = {
  title: {
    en: "Support & Donate",
    hi: "समर्थन एवं दान",
  },
  subtitle: {
    en: "Your generosity fuels lasting change. Every contribution strengthens our mission of education, healthcare, and sustainable empowerment across underserved communities.",
    hi: "आपकी उदारता स्थायी बदलाव को बढ़ावा देती है। हर योगदान शिक्षा, स्वास्थ्य सेवा और वंचित समुदायों में सतत सशक्तिकरण के हमारे मिशन को मजबूत करता है।",
  },
  image:
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1974",
};

const donationTiers = [
  {
    id: 1,
    amount: "₹500",
    title: { en: "Seed of Hope", hi: "आशा का बीज" },
    desc: {
      en: "Provides educational supplies for one rural student for an entire month.",
      hi: "एक ग्रामीण छात्र को पूरे एक महीने के लिए शैक्षिक सामग्री प्रदान करता है।",
    },
    icon: "📚",
  },
  {
    id: 2,
    amount: "₹2,000",
    title: { en: "Pillar of Progress", hi: "प्रगति का स्तंभ" },
    desc: {
      en: "Funds a complete health screening for 10 individuals in under-served areas.",
      hi: "वंचित क्षेत्रों में 10 व्यक्तियों की संपूर्ण स्वास्थ्य जांच का वित्तपोषण करता है।",
    },
    icon: "🏥",
  },
  {
    id: 3,
    amount: "₹5,000",
    title: { en: "Beacon of Change", hi: "बदलाव की किरण" },
    desc: {
      en: "Sponsors vocational training for a woman pursuing financial self-reliance.",
      hi: "वित्तीय आत्मनिर्भरता की ओर बढ़ रही एक महिला के व्यावसायिक प्रशिक्षण को प्रायोजित करता है।",
    },
    icon: "⚡",
  },
  {
    id: 4,
    amount: "₹10,000+",
    title: { en: "Institutional Patron", hi: "संस्थागत संरक्षक" },
    desc: {
      en: "Contributes to infrastructure development and long-term programme sustainability.",
      hi: "बुनियादी ढांचे के विकास और दीर्घकालिक कार्यक्रम स्थिरता में योगदान देता है।",
    },
    icon: "🏛️",
  },
];

const bankDetails = {
  title: { en: "Bank Transfer Details", hi: "बैंक हस्तांतरण विवरण" },
  items: [
    { label: { en: "Account Name", hi: "खाता नाम" }, value: "Heeralal Memorial Foundation" },
    { label: { en: "Bank Name", hi: "बैंक का नाम" }, value: "State Bank of India" },
    { label: { en: "Account No.", hi: "खाता संख्या" }, value: "XXXXXXXXXXXX" },
    { label: { en: "IFSC Code", hi: "IFSC कोड" }, value: "SBIN0XXXXXX" },
    { label: { en: "Branch", hi: "शाखा" }, value: "Central Delhi Branch" },
  ],
};

const taxInfo = {
  title: { en: "Tax Benefits Under Section 80G", hi: "धारा 80G के तहत कर लाभ" },
  description: {
    en: "All donations to the Heeralal Memorial Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. A formal donation receipt will be issued for every contribution received.",
    hi: "हीरालाल मेमोरियल फाउंडेशन को दिए गए सभी दान आयकर अधिनियम, 1961 की धारा 80G के तहत कर कटौती के पात्र हैं। प्राप्त प्रत्येक योगदान के लिए एक औपचारिक दान रसीद जारी की जाएगी।",
  },
  points: [
    { en: "80G Registration: Active", hi: "80G पंजीकरण: सक्रिय" },
    { en: "12A Status: Registered", hi: "12A स्थिति: पंजीकृत" },
    { en: "CSR Eligible: Yes", hi: "CSR पात्र: हाँ" },
    { en: "FCRA: Applied", hi: "FCRA: आवेदित" },
  ],
};

const otherWays = {
  title: { en: "Other Ways to Contribute", hi: "योगदान के अन्य तरीके" },
  items: [
    {
      icon: "🤲",
      title: { en: "Volunteer Your Time", hi: "अपना समय स्वयंसेवा करें" },
      desc: {
        en: "Join our on-ground teams and make a direct impact in the communities we serve.",
        hi: "हमारी ज़मीनी टीमों से जुड़ें और उन समुदायों में सीधा प्रभाव डालें जिनकी हम सेवा करते हैं।",
      },
    },
    {
      icon: "🏢",
      title: { en: "Corporate Partnership", hi: "कॉर्पोरेट साझेदारी" },
      desc: {
        en: "Fulfill your CSR obligations through structured, high-impact institutional programmes.",
        hi: "संरचित, उच्च-प्रभाव संस्थागत कार्यक्रमों के माध्यम से अपने CSR दायित्वों को पूरा करें।",
      },
    },
    {
      icon: "🎁",
      title: { en: "In-Kind Donations", hi: "वस्तु दान" },
      desc: {
        en: "Donate books, medical supplies, clothing, or equipment to support our field operations.",
        hi: "हमारे क्षेत्र संचालन का समर्थन करने के लिए पुस्तकें, चिकित्सा आपूर्ति, कपड़े या उपकरण दान करें।",
      },
    },
  ],
};

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const DonateHero = () => {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="relative md:h-80 h-56 w-full">
        <img
          src={heroData.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Donate"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/55 to-black/35" />
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
          <h1
            className="text-white text-2xl md:text-4xl font-bold italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {heroData.title[lang]}
          </h1>
          <p className="text-gray-300 mt-3 text-sm md:text-base max-w-2xl leading-relaxed">
            {heroData.subtitle[lang]}
          </p>
        </div>
      </div>
    </section>
  );
};

const DonationTiers = () => {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(null);

  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Choose Your Impact" : "अपना प्रभाव चुनें"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en" ? "Donation Categories" : "दान श्रेणियाँ"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded" />
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelected(tier.id)}
              className={`relative bg-white border rounded-lg p-6 text-center cursor-pointer group hover:-translate-y-1 transition-all duration-300 ${
                selected === tier.id
                  ? "border-[var(--color-primary)] shadow-lg ring-2 ring-[var(--color-ring)]"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Icon */}
              <div className="text-3xl mb-3">{tier.icon}</div>

              {/* Amount */}
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">
                {tier.amount}
              </h3>

              {/* Title */}
              <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-primary-dark)] mt-1 mb-3">
                {tier.title[lang]}
              </p>

              {/* Divider */}
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3" />

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed">
                {tier.desc[lang]}
              </p>

              {/* Selection indicator */}
              {selected === tier.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <span className="text-black text-xs font-bold">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Donate Button */}
        <div className="text-center mt-10">
          <Button size="lg">
            {lang === "en" ? "Proceed to Donate" : "दान करने के लिए आगे बढ़ें"}
          </Button>
          <p className="text-[11px] text-gray-500 mt-3">
            {lang === "en"
              ? "Secured via SSL encryption · 100% goes to the cause"
              : "SSL एन्क्रिप्शन द्वारा सुरक्षित · 100% कारण के लिए जाता है"}
          </p>
        </div>
      </div>
    </section>
  );
};

const BankDetailsSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Transfer Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              {bankDetails.title[lang]}
            </h3>
          </div>

          <div className="border border-[var(--color-secondary-light)] rounded overflow-hidden">
            {bankDetails.items.map((item, i) => (
              <div
                key={i}
                className={`flex text-sm px-4 py-3 ${
                  i % 2 === 0
                    ? "bg-[var(--color-bg)]"
                    : "bg-white"
                }`}
              >
                <span className="text-[var(--color-secondary)] font-semibold min-w-[130px] text-xs">
                  {item.label[lang]}:
                </span>
                <span className="text-gray-700 text-xs ml-2">{item.value}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 mt-4 italic">
            {lang === "en"
              ? "Please share the transaction reference via email for receipt issuance."
              : "रसीद जारी करने के लिए कृपया लेनदेन संदर्भ ईमेल के माध्यम से साझा करें।"}
          </p>
        </div>

        {/* Tax Benefits */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              {taxInfo.title[lang]}
            </h3>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed mb-5">
            {taxInfo.description[lang]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {taxInfo.points.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded border border-gray-100 bg-[var(--color-bg)]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-800">
                  {point[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OtherWaysSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)]">
            {otherWays.title[lang]}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherWays.items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
                {item.title[lang]}
              </h3>
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3" />
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DonateCTA = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto bg-[image:var(--gradient-secondary)] rounded-lg p-8 md:p-12 text-center shadow-lg">
        <h2
          className="text-white text-xl md:text-2xl font-bold italic mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {lang === "en"
            ? "Every Act of Giving Creates a Ripple of Change"
            : "देने का हर कार्य बदलाव की तरंग पैदा करता है"}
        </h2>
        <p className="text-gray-300 text-xs leading-relaxed max-w-xl mx-auto mb-6">
          {lang === "en"
            ? "Join thousands of compassionate supporters who believe in building a more equitable society. Your contribution, regardless of its size, makes a measurable difference."
            : "हजारों दयालु समर्थकों से जुड़ें जो एक अधिक न्यायसंगत समाज के निर्माण में विश्वास करते हैं। आपका योगदान, चाहे कितना भी हो, एक मापने योग्य अंतर लाता है।"}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="bg-[var(--color-primary)] text-black text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded hover:bg-[var(--color-primary-dark)] hover:text-white transition-colors duration-200">
            {lang === "en" ? "Donate Now" : "अभी दान करें"}
          </button>
          <button className="border border-white text-white text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded hover:bg-white hover:text-[var(--color-secondary)] transition-colors duration-200">
            {lang === "en" ? "Contact for CSR" : "CSR के लिए संपर्क करें"}
          </button>
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Donate = () => {
  return (
    <div>
      <Navbar />
      <DonateHero />
      <DonationTiers />
      <BankDetailsSection />
      <OtherWaysSection />
      <DonateCTA />
      <Footer />
    </div>
  );
};

export default Donate;
