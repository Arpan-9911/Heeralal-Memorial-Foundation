import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { toast } from "sonner";

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

const formTypes = [
  {
    key: "volunteer",
    title: { en: "Volunteer Application Form", hi: "स्वयंसेवक आवेदन पत्र" },
    subtitle: { en: "Join us as a Volunteer", hi: "स्वयंसेवक के रूप में जुड़ें" },
    icon: "🤝",
    signatureLabel: { en: "Volunteer Signature", hi: "स्वयंसेवक के हस्ताक्षर" },
    desc: {
      en: "Dedicate your time and skills to community projects, health camps, and educational drives.",
      hi: "सामुदायिक परियोजनाओं, स्वास्थ्य शिविरों और शैक्षिक अभियानों के लिए अपना समय और कौशल समर्पित करें।",
    },
  },
  {
    key: "skill_development",
    title: { en: "Skill Development Scheme — Enrollment Form", hi: "कौशल विकास योजना — नामांकन फॉर्म" },
    subtitle: { en: "Enroll in our Skill Development Program", hi: "हमारे कौशल विकास कार्यक्रम में नामांकन करें" },
    icon: "🎓",
    signatureLabel: { en: "Trainee Signature", hi: "प्रशिक्षु के हस्ताक्षर" },
    desc: {
      en: "Gain hands-on experience in social development while contributing to real-world impact projects.",
      hi: "वास्तविक प्रभाव परियोजनाओं में योगदान देते हुए सामाजिक विकास में व्यावहारिक अनुभव प्राप्त करें।",
    },
  },
  {
    key: "membership",
    title: { en: "Membership Application Form", hi: "सदस्यता आवेदन पत्र" },
    subtitle: { en: "Apply for Foundation Membership", hi: "फाउंडेशन सदस्यता के लिए आवेदन करें" },
    icon: "📋",
    signatureLabel: { en: "Member Signature", hi: "सदस्य के हस्ताक्षर" },
    desc: {
      en: "Become a member of the Foundation and contribute to institutional partnerships and governance.",
      hi: "फाउंडेशन के सदस्य बनें और संस्थागत साझेदारी और शासन में योगदान दें।",
    },
    extra: ["dob", "membershipFees"],
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

/* ────────────────────────── INLINE APPLICATION FORM ───────────────────────── */

const ApplicationForm = ({ formDef, onClose }) => {
  const { lang } = useLanguage();
  const [form, setForm] = useState({
    name: "", aadharNo: "", dob: "", address: "",
    mobileNo: "", emailId: "", occupation: "",
    reference: "", department: "", membershipFees: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.mobileNo) {
      toast.error(lang === "en" ? "Please fill required fields" : "कृपया आवश्यक फ़ील्ड भरें");
      return;
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("formType", formDef.key);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append("photo", photo);

      await axios.post(`${API_URL}/applications`, fd);
      setSubmitted(true);
      toast.success(lang === "en" ? "Application submitted!" : "आवेदन सफलतापूर्वक जमा!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-2">
          {lang === "en" ? "Application Submitted!" : "आवेदन जमा हो गया!"}
        </h2>
        <p className="text-sm text-gray-600">
          {lang === "en"
            ? "Your application has been received. Our team will review it shortly."
            : "आपका आवेदन प्राप्त हो गया है। हमारी टीम जल्द ही इसकी समीक्षा करेगी।"}
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 text-xs font-semibold text-[var(--color-secondary)] border border-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-200"
        >
          {lang === "en" ? "← Back to Forms" : "← फॉर्म पर वापस"}
        </button>
      </div>
    );
  }

  const inp =
    "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400";
  const fieldWrap =
    "group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-light)] transition-all duration-200";

  const isMembership = formDef.key === "membership";

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header mimicking the paper form */}
      <div className="bg-[var(--color-primary-light)] border-b border-[var(--color-primary)] px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{formDef.icon}</div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-secondary)] uppercase tracking-wide">
                {formDef.title[lang]}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Heeralal Memorial Foundation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
          >
            ✕ {lang === "en" ? "Close" : "बंद"}
          </button>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Department + Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Department" : "विभाग"}
            </label>
            <div className={fieldWrap}>
              <input name="department" value={form.department} onChange={handleChange} placeholder={lang === "en" ? "Department name" : "विभाग का नाम"} className={inp} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Date" : "दिनांक"}
            </label>
            <div className={fieldWrap}>
              <input type="date" name="date" className={inp} defaultValue={new Date().toISOString().split("T")[0]} readOnly />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            {lang === "en" ? "Passport Photo" : "पासपोर्ट फोटो"}
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-24 rounded border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-1">{lang === "en" ? "Photo" : "फोटो"}</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handlePhoto} className="text-xs" />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            {lang === "en" ? "Name" : "नाम"} <span className="text-red-500">*</span>
          </label>
          <div className={fieldWrap}>
            <input name="name" value={form.name} onChange={handleChange} placeholder={lang === "en" ? "Full Name" : "पूरा नाम"} className={inp} required />
          </div>
        </div>

        {/* Aadhar */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            {lang === "en" ? "Aadhar No." : "आधार नं."}
          </label>
          <div className={fieldWrap}>
            <input name="aadharNo" value={form.aadharNo} onChange={handleChange} placeholder="XXXX XXXX XXXX" className={inp} />
          </div>
        </div>

        {/* DOB — membership only */}
        {isMembership && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "D.O.B & Age" : "जन्मतिथि एवं आयु"}
            </label>
            <div className={fieldWrap}>
              <input name="dob" value={form.dob} onChange={handleChange} placeholder={lang === "en" ? "DD/MM/YYYY & Age" : "DD/MM/YYYY एवं आयु"} className={inp} />
            </div>
          </div>
        )}

        {/* Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            {lang === "en" ? "Address" : "पता"}
          </label>
          <div className="group rounded border border-gray-300 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
            <textarea name="address" rows={2} value={form.address} onChange={handleChange} placeholder={lang === "en" ? "Full Address" : "पूरा पता"} className="w-full resize-none bg-transparent px-3 py-2.5 outline-none text-sm text-gray-800 placeholder-gray-400 rounded" />
          </div>
        </div>

        {/* Mobile + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Mobile No." : "मोबाइल नं."} <span className="text-red-500">*</span>
            </label>
            <div className={fieldWrap}>
              <input name="mobileNo" type="tel" value={form.mobileNo} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inp} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Email Id" : "ईमेल आईडी"}
            </label>
            <div className={fieldWrap}>
              <input name="emailId" type="email" value={form.emailId} onChange={handleChange} placeholder="email@example.com" className={inp} />
            </div>
          </div>
        </div>

        {/* Occupation + Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Occupation" : "व्यवसाय"}
            </label>
            <div className={fieldWrap}>
              <input name="occupation" value={form.occupation} onChange={handleChange} placeholder={lang === "en" ? "Your occupation" : "आपका व्यवसाय"} className={inp} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Reference" : "संदर्भ"}
            </label>
            <div className={fieldWrap}>
              <input name="reference" value={form.reference} onChange={handleChange} placeholder={lang === "en" ? "Reference person" : "संदर्भ व्यक्ति"} className={inp} />
            </div>
          </div>
        </div>

        {/* Membership Fees — membership only */}
        {isMembership && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">
              {lang === "en" ? "Membership Fees" : "सदस्यता शुल्क"}
            </label>
            <div className={fieldWrap}>
              <input name="membershipFees" value={form.membershipFees} onChange={handleChange} placeholder="₹" className={inp} />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg font-bold text-sm text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark, #2a0a08) 100%)",
          }}
        >
          {submitting
            ? (lang === "en" ? "Submitting..." : "भेज रहे हैं...")
            : (lang === "en" ? "Submit Application" : "आवेदन जमा करें")}
        </button>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 flex justify-between text-[10px] text-gray-400">
          <span>{formDef.signatureLabel[lang]}</span>
          <span>{lang === "en" ? "Authorized Person (HLM Foundation)" : "अधिकृत व्यक्ति (एचएलएम फाउंडेशन)"}</span>
        </div>
      </form>
    </div>
  );
};

/* ────────────────────────── FORM SELECTOR CARDS ───────────────────────────── */

const FormCardsSection = () => {
  const { lang } = useLanguage();
  const [activeForm, setActiveForm] = useState(null);

  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Choose Your Path" : "अपना रास्ता चुनें"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en"
              ? "How Would You Like to Contribute?"
              : "आप कैसे योगदान देना चाहेंगे?"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
          <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
            {lang === "en"
              ? "Select the appropriate form below to apply for volunteering, skill development, or membership with the Foundation."
              : "फाउंडेशन के साथ स्वयंसेवा, कौशल विकास, या सदस्यता के लिए नीचे उपयुक्त फॉर्म चुनें।"}
          </p>
        </div>

        {/* Cards */}
        {!activeForm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {formTypes.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveForm(f)}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[var(--color-primary)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-bold text-[var(--color-secondary)] group-hover:text-[var(--color-primary-dark)]">
                  {f.title[lang]}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {f.desc[lang]}
                </p>
                <div className="mt-4 text-[10px] uppercase tracking-widest font-bold text-[var(--color-primary)]">
                  {lang === "en" ? "Apply Now →" : "अभी आवेदन करें →"}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Active Form (inline) */}
        {activeForm && (
          <div>
            <button
              onClick={() => setActiveForm(null)}
              className="mb-4 text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
            >
              ← {lang === "en" ? "Back to all forms" : "सभी फॉर्म पर वापस"}
            </button>
            <ApplicationForm formDef={activeForm} onClose={() => setActiveForm(null)} />
          </div>
        )}
      </div>
    </section>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const JoinUs = () => {
  return (
    <div>
      <Navbar />
      <JoinHero />
      <WhyJoinSection />
      <FormCardsSection />
      <Footer />
    </div>
  );
};

export default JoinUs;
