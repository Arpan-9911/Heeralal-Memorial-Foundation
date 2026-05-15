import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

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

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const DonateHero = () => {
  const { lang } = useLanguage();
  return (
    <section>
      <div className="relative md:h-80 h-56 w-full">
        <img src={heroData.image} className="absolute inset-0 w-full h-full object-cover" alt="Donate" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/55 to-black/35" />
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
          <h1 className="text-white text-2xl md:text-4xl font-bold italic" style={{ fontFamily: "'Georgia', serif" }}>
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

const DonationTiersSection = () => {
  const { lang } = useLanguage();
  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Choose Your Impact" : "अपना प्रभाव चुनें"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en" ? "Donation Categories" : "दान श्रेणियाँ"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationTiers.map((tier) => (
            <div key={tier.id} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-3">{tier.icon}</div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">{tier.amount}</h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-primary-dark)] mt-1 mb-3">
                {tier.title[lang]}
              </p>
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3" />
              <p className="text-xs text-gray-600 leading-relaxed">{tier.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PaymentSection = () => {
  const { lang } = useLanguage();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/donations/config`).then((res) => {
      if (res.data?.config) setConfig(res.data.config);
    }).catch(() => {});
  }, []);

  const bankItems = config
    ? [
        { label: { en: "Account Name", hi: "खाता नाम" }, value: config.accountName },
        { label: { en: "Bank Name", hi: "बैंक का नाम" }, value: config.bankName },
        { label: { en: "Account No.", hi: "खाता संख्या" }, value: config.accountNo },
        { label: { en: "IFSC Code", hi: "IFSC कोड" }, value: config.ifscCode },
        { label: { en: "Branch", hi: "शाखा" }, value: config.branch },
      ]
    : [
        { label: { en: "Account Name", hi: "खाता नाम" }, value: "Heeralal Memorial Foundation" },
        { label: { en: "Bank Name", hi: "बैंक का नाम" }, value: "State Bank of India" },
        { label: { en: "Account No.", hi: "खाता संख्या" }, value: "XXXXXXXXXXXX" },
        { label: { en: "IFSC Code", hi: "IFSC कोड" }, value: "SBIN0XXXXXX" },
        { label: { en: "Branch", hi: "शाखा" }, value: "Central Delhi Branch" },
      ];

  const qrSrc = config?.qrImage
    ? `${BACKEND_URL}/uploads/donations/${config.qrImage}`
    : null;

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "How to Donate" : "कैसे दान करें"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en" ? "Scan & Pay or Bank Transfer" : "स्कैन और भुगतान या बैंक ट्रांसफर"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded" />
        </div>

        {/* Axis Bank Header Banner */}
        <div
          className="rounded-lg overflow-hidden mb-8"
          style={{
            background: "linear-gradient(135deg, #97144d 0%, #97144d 60%, #b8276e 100%)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
            <div className="flex items-center gap-3">
              {/* Axis Bank Logo Mark */}
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,2 38,38 2,38" fill="white" />
                  <polygon points="20,12 30,34 10,34" fill="#97144d" />
                </svg>
                <span className="text-white text-xl md:text-2xl font-bold tracking-wide" style={{ fontFamily: "'Arial', sans-serif" }}>
                  AXIS BANK
                </span>
              </div>
            </div>
            <div className="h-6 w-20 md:w-28 rounded" style={{ background: "linear-gradient(90deg, #0072bc, #00a4e4)" }} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Code */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-5 self-start">
              <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
                {lang === "en" ? "Scan QR to Pay (UPI)" : "QR स्कैन करके भुगतान करें (UPI)"}
              </h3>
            </div>

            {qrSrc ? (
              <div className="w-64 h-64 rounded-xl border-2 border-[var(--color-primary)] p-2 bg-white">
                <img src={qrSrc} alt="UPI QR Code" className="w-full h-full object-contain rounded-lg" />
              </div>
            ) : (
              <div className="w-64 h-64 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-400 text-center px-4">
                  {lang === "en" ? "QR Code will appear here" : "QR कोड यहाँ दिखेगा"}
                </p>
              </div>
            )}

            {config?.upiId && (
              <div className="mt-4 bg-[var(--color-primary-light)] rounded-lg px-4 py-2 border border-[var(--color-primary)]">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-[var(--color-secondary)]">UPI ID: </span>
                  {config.upiId}
                </p>
              </div>
            )}

            <p className="text-[11px] text-gray-500 mt-4 text-center italic">
              {lang === "en"
                ? "Open any UPI app (GPay, PhonePe, Paytm) → Scan → Pay → Fill the form below"
                : "कोई भी UPI ऐप खोलें (GPay, PhonePe, Paytm) → स्कैन करें → भुगतान करें → नीचे फॉर्म भरें"}
            </p>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
                {lang === "en" ? "Bank Transfer Details" : "बैंक हस्तांतरण विवरण"}
              </h3>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              {bankItems.map((item, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center px-5 py-4 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} ${i !== bankItems.length - 1 ? "border-b border-gray-200" : ""}`}>
                  <span className="text-gray-600 font-medium sm:min-w-[160px] text-sm uppercase tracking-wider">
                    {item.label[lang]}:
                  </span>
                  <span className="text-gray-900 text-base md:text-lg font-bold sm:ml-4 font-sans tracking-wide">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tax Info */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)] mb-3">
                {taxInfo.title[lang]}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{taxInfo.description[lang]}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {taxInfo.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded border border-gray-100 bg-[var(--color-bg)]">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-gray-800">{point[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PaymentConfirmationForm = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    utrNumber: "",
    paymentMode: "upi",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`${API_URL}/donations`, formData);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="px-4 py-12">
        <div className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-2">
            {lang === "en" ? "Thank You for Your Donation!" : "आपके दान के लिए धन्यवाद!"}
          </h2>
          <p className="text-sm text-gray-600">
            {lang === "en"
              ? "Your payment details have been recorded. Our team will verify the transaction and send you a receipt via email."
              : "आपके भुगतान विवरण दर्ज हो गए हैं। हमारी टीम लेनदेन की पुष्टि करेगी और आपको ईमेल से रसीद भेजेगी।"}
          </p>
        </div>
      </section>
    );
  }

  const inputWrap = "group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200";

  return (
    <section className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">
            {lang === "en" ? "Already Paid? Confirm Your Donation" : "भुगतान कर चुके हैं? अपने दान की पुष्टि करें"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {lang === "en"
              ? "Fill in the details below after making your payment so we can verify and send you a receipt."
              : "भुगतान करने के बाद नीचे विवरण भरें ताकि हम सत्यापित कर सकें और आपको रसीद भेज सकें।"}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Full Name" : "पूरा नाम"} <span className="text-red-500">*</span>
                </label>
                <div className={inputWrap}>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    placeholder={lang === "en" ? "Your full name" : "आपका पूरा नाम"}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Email" : "ईमेल"} <span className="text-red-500">*</span>
                </label>
                <div className={inputWrap}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder={lang === "en" ? "Your email" : "आपका ईमेल"}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Phone Number" : "फ़ोन नंबर"} <span className="text-red-500">*</span>
                </label>
                <div className={inputWrap}>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Amount Paid (₹)" : "भुगतान राशि (₹)"} <span className="text-red-500">*</span>
                </label>
                <div className={inputWrap}>
                  <input type="text" name="amount" value={formData.amount} onChange={handleChange}
                    placeholder="e.g. 5000"
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "UTR / Transaction Reference No." : "UTR / लेनदेन संदर्भ संख्या"} <span className="text-red-500">*</span>
                </label>
                <div className={inputWrap}>
                  <input type="text" name="utrNumber" value={formData.utrNumber} onChange={handleChange}
                    placeholder={lang === "en" ? "12-digit UTR number" : "12-अंकी UTR संख्या"}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Payment Mode" : "भुगतान का तरीका"}
                </label>
                <div className={inputWrap}>
                  <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-800">
                    <option value="upi">{lang === "en" ? "UPI (GPay / PhonePe / Paytm)" : "UPI (GPay / PhonePe / Paytm)"}</option>
                    <option value="bank_transfer">{lang === "en" ? "Bank Transfer (NEFT/RTGS/IMPS)" : "बैंक ट्रांसफर (NEFT/RTGS/IMPS)"}</option>
                    <option value="other">{lang === "en" ? "Other" : "अन्य"}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                {lang === "en" ? "Message (optional)" : "संदेश (वैकल्पिक)"}
              </label>
              <div className="group rounded border border-gray-300 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                <textarea name="message" rows={3} value={formData.message} onChange={handleChange}
                  placeholder={lang === "en" ? "Any message for the foundation..." : "फाउंडेशन के लिए कोई संदेश..."}
                  className="w-full resize-none bg-transparent px-3 py-2.5 outline-none text-sm text-gray-800 placeholder-gray-400 rounded" />
              </div>
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting
                ? (lang === "en" ? "Submitting..." : "भेज रहे हैं...")
                : (lang === "en" ? "Submit Donation Details" : "दान विवरण जमा करें")}
            </Button>
          </form>
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
        <h2 className="text-white text-xl md:text-2xl font-bold italic mb-3" style={{ fontFamily: "'Georgia', serif" }}>
          {lang === "en" ? "Every Act of Giving Creates a Ripple of Change" : "देने का हर कार्य बदलाव की तरंग पैदा करता है"}
        </h2>
        <p className="text-gray-300 text-xs leading-relaxed max-w-xl mx-auto mb-6">
          {lang === "en"
            ? "Join thousands of compassionate supporters who believe in building a more equitable society. Your contribution, regardless of its size, makes a measurable difference."
            : "हजारों दयालु समर्थकों से जुड़ें जो एक अधिक न्यायसंगत समाज के निर्माण में विश्वास करते हैं।"}
        </p>
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
      <DonationTiersSection />
      <PaymentSection />
      <PaymentConfirmationForm />
      <DonateCTA />
      <Footer />
    </div>
  );
};

export default Donate;
