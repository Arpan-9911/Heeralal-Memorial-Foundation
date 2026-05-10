import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const heroData = {
  title: {
    en: "Join Our Mission",
    hi: "हमारे मिशन से जुड़ें",
  },
  subtitle: {
    en: "Be a part of the change. Whether you want to volunteer, intern, or partner with us — every contribution matters. Together we build a better tomorrow.",
    hi: "बदलाव का हिस्सा बनें। चाहे आप स्वयंसेवक बनना चाहते हों, इंटर्न करना चाहते हों, या हमारे साथ साझेदारी करना चाहते हों — हर योगदान मायने रखता है।",
  },
  image:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1974",
};

const roles = [
  {
    icon: "🤝",
    value: "volunteer",
    label: { en: "Volunteer", hi: "स्वयंसेवक" },
    desc: {
      en: "Dedicate your time and skills to community projects, health camps, and educational drives.",
      hi: "सामुदायिक परियोजनाओं, स्वास्थ्य शिविरों और शैक्षिक अभियानों के लिए अपना समय और कौशल समर्पित करें।",
    },
  },
  {
    icon: "🎓",
    value: "intern",
    label: { en: "Intern", hi: "इंटर्न" },
    desc: {
      en: "Gain hands-on experience in social development while contributing to real-world impact projects.",
      hi: "वास्तविक प्रभाव परियोजनाओं में योगदान देते हुए सामाजिक विकास में व्यावहारिक अनुभव प्राप्त करें।",
    },
  },
  {
    icon: "🌾",
    value: "fieldworker",
    label: { en: "Field Worker", hi: "फील्ड वर्कर" },
    desc: {
      en: "Work directly with rural and underserved communities on the ground level.",
      hi: "ग्रामीण और वंचित समुदायों के साथ सीधे जमीनी स्तर पर काम करें।",
    },
  },
  {
    icon: "💰",
    value: "donor",
    label: { en: "Donor", hi: "दानकर्ता" },
    desc: {
      en: "Support our programs financially and help us scale our impact across communities.",
      hi: "हमारे कार्यक्रमों को आर्थिक रूप से समर्थन दें और हमें समुदायों में अपना प्रभाव बढ़ाने में मदद करें।",
    },
  },
  {
    icon: "🏢",
    value: "partner",
    label: { en: "CSR / Partner", hi: "CSR / साझेदार" },
    desc: {
      en: "Collaborate with us on institutional partnerships, CSR initiatives, and MoU-based programs.",
      hi: "संस्थागत साझेदारी, CSR पहल और MoU-आधारित कार्यक्रमों पर हमारे साथ सहयोग करें।",
    },
  },
  {
    icon: "✨",
    value: "other",
    label: { en: "Other", hi: "अन्य" },
    desc: {
      en: "Have a unique way to contribute? Tell us about it and we'll find the right fit for you.",
      hi: "योगदान करने का कोई अनूठा तरीका है? हमें बताएं और हम आपके लिए सही जगह खोजेंगे।",
    },
  },
];

const whyJoin = [
  {
    icon: "🌍",
    title: { en: "Create Real Impact", hi: "वास्तविक प्रभाव बनाएं" },
    desc: {
      en: "Work directly with communities in education, healthcare, and empowerment.",
      hi: "शिक्षा, स्वास्थ्य और सशक्तिकरण में समुदायों के साथ सीधे काम करें।",
    },
  },
  {
    icon: "📜",
    title: { en: "Get Certified", hi: "प्रमाणपत्र प्राप्त करें" },
    desc: {
      en: "Receive official certificates and letters of recommendation for your contributions.",
      hi: "अपने योगदान के लिए आधिकारिक प्रमाणपत्र और सिफारिश पत्र प्राप्त करें।",
    },
  },
  {
    icon: "🤗",
    title: { en: "Grow Together", hi: "साथ मिलकर बढ़ें" },
    desc: {
      en: "Join a network of passionate changemakers and build lifelong connections.",
      hi: "उत्साही परिवर्तनकर्ताओं के नेटवर्क से जुड़ें और आजीवन संबंध बनाएं।",
    },
  },
  {
    icon: "🏅",
    title: { en: "Leadership Opportunities", hi: "नेतृत्व के अवसर" },
    desc: {
      en: "Take charge of projects, lead teams, and develop professional skills.",
      hi: "परियोजनाओं की जिम्मेदारी लें, टीमों का नेतृत्व करें और पेशेवर कौशल विकसित करें।",
    },
  },
];

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const JoinHero = () => {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="relative md:h-80 h-56 w-full">
        <img
          src={heroData.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Join Us"
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

const WhyJoinSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-12 bg-[var(--color-primary-light)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Why Join Us" : "हमसे क्यों जुड़ें"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en"
              ? "Be Part of Something Bigger"
              : "कुछ बड़े का हिस्सा बनें"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyJoin.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-wide">
                {item.title[lang]}
              </h3>
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3"></div>
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

const RoleCards = ({ selectedRole, onSelect }) => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">
            {lang === "en"
              ? "How Would You Like to Contribute?"
              : "आप कैसे योगदान देना चाहेंगे?"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {lang === "en"
              ? "Select a role that best fits you"
              : "वह भूमिका चुनें जो आपको सबसे अच्छी लगे"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => onSelect(role.value)}
              className={`p-4 rounded-lg border-2 text-center transition-all duration-200 cursor-pointer ${
                selectedRole === role.value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-md scale-105"
                  : "border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-sm"
              }`}
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <p className="text-xs font-bold text-[var(--color-secondary)]">
                {role.label[lang]}
              </p>
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="mt-6 bg-[var(--color-primary-light)] border border-[var(--color-primary)] rounded-lg p-4 max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-700">
              {roles.find((r) => r.value === selectedRole)?.desc[lang]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const JoinForm = ({ selectedRole }) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert(lang === "en" ? "Please select a role above" : "कृपया ऊपर एक भूमिका चुनें");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${API_URL}/join-requests`, {
        ...formData,
        role: selectedRole,
      });
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="px-4 py-12 bg-[var(--color-primary-light)]">
        <div className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-10 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-2">
            {lang === "en" ? "Thank You for Joining!" : "जुड़ने के लिए धन्यवाद!"}
          </h2>
          <p className="text-sm text-gray-600">
            {lang === "en"
              ? "Your request has been submitted successfully. Our team will review it and get back to you soon."
              : "आपका अनुरोध सफलतापूर्वक सबमिट हो गया है। हमारी टीम इसकी समीक्षा करेगी और जल्द ही आपसे संपर्क करेगी।"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 bg-[var(--color-primary-light)]">
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
          <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
            {lang === "en" ? "Your Details" : "आपका विवरण"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                {lang === "en" ? "Full Name" : "पूरा नाम"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={lang === "en" ? "Enter your full name" : "अपना पूरा नाम दर्ज करें"}
                  className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                {lang === "en" ? "Email Address" : "ईमेल पता"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={lang === "en" ? "Enter your email" : "अपना ईमेल दर्ज करें"}
                  className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Phone Number" : "फ़ोन नंबर"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Why do you want to join?" : "आप क्यों जुड़ना चाहते हैं?"}{" "}
              <span className="text-gray-400 text-[10px]">({lang === "en" ? "optional" : "वैकल्पिक"})</span>
            </label>
            <div className="group rounded border border-gray-300 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  lang === "en"
                    ? "Tell us about yourself and how you'd like to help..."
                    : "हमें अपने बारे में बताएं और आप कैसे मदद करना चाहेंगे..."
                }
                className="w-full resize-none bg-transparent px-3 py-2.5 outline-none text-sm text-gray-800 placeholder-gray-400 rounded"
              />
            </div>
          </div>

          {/* Selected Role Indicator */}
          {selectedRole && (
            <div className="flex items-center gap-2 text-sm bg-[var(--color-primary-light)] rounded-lg px-4 py-2 border border-[var(--color-primary)]">
              <span className="text-lg">{roles.find(r => r.value === selectedRole)?.icon}</span>
              <span className="font-semibold text-[var(--color-secondary)]">
                {lang === "en" ? "Applying as:" : "आवेदन:"}{" "}
                {roles.find(r => r.value === selectedRole)?.label[lang]}
              </span>
            </div>
          )}

          <Button type="submit" disabled={submitting}>
            {submitting
              ? (lang === "en" ? "Submitting..." : "भेज रहे हैं...")
              : (lang === "en" ? "Submit Application" : "आवेदन जमा करें")}
          </Button>
        </form>
      </div>
    </section>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const JoinUs = () => {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div>
      <Navbar />
      <JoinHero />
      <WhyJoinSection />
      <RoleCards selectedRole={selectedRole} onSelect={setSelectedRole} />
      <JoinForm selectedRole={selectedRole} />
      <Footer />
    </div>
  );
};

export default JoinUs;
