import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import { getSettings } from "../api";

/* ────────────────────────────── HERO DATA ──────────────────────────────────── */

const heroData = {
  title: {
    en: "Contact Us",
    hi: "संपर्क करें",
  },
  subtitle: {
    en: "We welcome your queries, feedback, and partnership inquiries. Reach out to us through any of the channels below.",
    hi: "हम आपके प्रश्नों, प्रतिक्रिया और साझेदारी संबंधी पूछताछ का स्वागत करते हैं। नीचे दिए गए किसी भी माध्यम से हमसे संपर्क करें।",
  },
  image:
    "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1974",
};

/* ────────────────────────── HELPER ───────────────────────────── */

const getContactVal = (settings, key) => {
  if (!settings || !settings.contact) return null;
  const item = settings.contact.find((i) => i.key === key);
  return item ? item.value : null;
};

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const ContactHero = () => {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="relative md:h-80 h-56 w-full">
        <img
          src={heroData.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Contact Us"
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

const ContactForm = ({ settings }) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /* Build departments dynamically from settings */
  const departments = [];
  for (let i = 1; i <= 4; i++) {
    const titleEn = getContactVal(settings, `dept${i}TitleEn`);
    const titleHi = getContactVal(settings, `dept${i}TitleHi`);
    if (titleEn || titleHi) {
      departments.push({
        title: { en: titleEn || "", hi: titleHi || "" },
        contact: { en: getContactVal(settings, `dept${i}Contact`) || "", hi: getContactVal(settings, `dept${i}Contact`) || "" },
        head: { en: getContactVal(settings, `dept${i}HeadEn`) || "", hi: getContactVal(settings, `dept${i}HeadHi`) || "" },
      });
    }
  }

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left: Form */}
        <div className="md:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              {lang === "en" ? "Send Us a Message" : "हमें संदेश भेजें"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Full Name" : "पूरा नाम"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === "en" ? "Enter your name" : "अपना नाम दर्ज करें"}
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

            {/* Phone + Subject Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Phone Number" : "फ़ोन नंबर"}
                </label>
                <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={lang === "en" ? "+91 XXXXX XXXXX" : "+91 XXXXX XXXXX"}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500">
                  {lang === "en" ? "Subject" : "विषय"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="group flex items-center rounded border border-gray-300 px-3 py-2.5 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-800"
                    required
                  >
                    <option value="">
                      {lang === "en" ? "Select a subject" : "विषय चुनें"}
                    </option>
                    <option value="general">
                      {lang === "en" ? "General Inquiry" : "सामान्य पूछताछ"}
                    </option>
                    <option value="donation">
                      {lang === "en" ? "Donation Query" : "दान संबंधी प्रश्न"}
                    </option>
                    <option value="volunteer">
                      {lang === "en" ? "Volunteer Registration" : "स्वयंसेवक पंजीकरण"}
                    </option>
                    <option value="csr">
                      {lang === "en" ? "CSR Partnership" : "CSR साझेदारी"}
                    </option>
                    <option value="complaint">
                      {lang === "en" ? "Complaint / Grievance" : "शिकायत / शिकायत"}
                    </option>
                    <option value="other">
                      {lang === "en" ? "Other" : "अन्य"}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500">
                {lang === "en" ? "Your Message" : "आपका संदेश"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="group rounded border border-gray-300 bg-white hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary-light)] focus-within:ring-3 focus-within:ring-[var(--color-primary-light)] transition-all duration-200">
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    lang === "en"
                      ? "Write your message here..."
                      : "अपना संदेश यहाँ लिखें..."
                  }
                  className="w-full resize-none bg-transparent px-3 py-2.5 outline-none text-sm text-gray-800 placeholder-gray-400 rounded"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit">
              {lang === "en" ? "Submit Message" : "संदेश जमा करें"}
            </Button>
          </form>
        </div>

        {/* Right: Department Directory */}
        <div className="md:col-span-2">
          <div className="bg-[image:var(--gradient-secondary)] rounded-lg p-6 shadow-lg h-full">
            <h3 className="text-lg uppercase tracking-widest mb-6 text-[var(--color-primary)] font-bold">
              {lang === "en" ? "Department Directory" : "विभाग निर्देशिका"}
            </h3>

            <div className="space-y-5">
              {departments.map((dept, i) => (
                <div
                  key={i}
                  className="border-l-2 border-[var(--color-primary)] pl-4"
                >
                  <h4 className="text-sm font-semibold text-white">
                    {dept.title[lang]}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    {lang === "en" ? "Head: " : "प्रमुख: "}
                    {dept.head[lang]}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {dept.contact[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[var(--color-secondary-light)]">
              <p className="text-[11px] text-gray-400 italic leading-relaxed">
                {lang === "en"
                  ? `For urgent matters outside business hours, please email ${getContactVal(settings, "email") || "admin@hlmf.org.in"} with "URGENT" in the subject line.`
                  : `कार्यालय समय के बाहर तत्काल मामलों के लिए, कृपया विषय पंक्ति में "URGENT" के साथ ${getContactVal(settings, "email") || "admin@hlmf.org.in"} पर ईमेल करें।`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCards = ({ settings }) => {
  const { lang } = useLanguage();

  const dynamicCards = [
    {
      icon: "📍",
      title: { en: "Registered Office", hi: "पंजीकृत कार्यालय" },
      lines: [
        {
          en: getContactVal(settings, "addressEn") || "12/4B Institutional Area, New Delhi - 110001",
          hi: getContactVal(settings, "addressHi") || "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001",
        },
        ...(getContactVal(settings, "address2En")
          ? [
              {
                en: getContactVal(settings, "address2En"),
                hi: getContactVal(settings, "address2Hi"),
              },
            ]
          : []),
      ],
    },
    {
      icon: "📞",
      title: { en: "Phone & Helpline", hi: "फ़ोन और हेल्पलाइन" },
      lines: [
        {
          en: `General: ${getContactVal(settings, "phone") || "+91 11-2345XXXX"}`,
          hi: `सामान्य: ${getContactVal(settings, "phone") || "+91 11-2345XXXX"}`,
        },
        {
          en: `Helpline: ${getContactVal(settings, "helpline") || "1800-XXX-XXXX"} (Toll Free)`,
          hi: `हेल्पलाइन: ${getContactVal(settings, "helpline") || "1800-XXX-XXXX"} (टोल फ्री)`,
        },
      ],
    },
    {
      icon: "✉️",
      title: { en: "Email", hi: "ईमेल" },
      lines: [
        {
          en: `General: ${getContactVal(settings, "email") || "admin@hlmf.org.in"}`,
          hi: `सामान्य: ${getContactVal(settings, "email") || "admin@hlmf.org.in"}`,
        },
        {
          en: `Donations: ${getContactVal(settings, "donationEmail") || "donate@hlmf.org.in"}`,
          hi: `दान: ${getContactVal(settings, "donationEmail") || "donate@hlmf.org.in"}`,
        },
        {
          en: `Careers: ${getContactVal(settings, "careerEmail") || "hr@hlmf.org.in"}`,
          hi: `करियर: ${getContactVal(settings, "careerEmail") || "hr@hlmf.org.in"}`,
        },
      ],
    },
    {
      icon: "🕐",
      title: { en: "Office Hours", hi: "कार्यालय समय" },
      lines: [
        {
          en: getContactVal(settings, "officeHoursMFEn") || "Monday – Friday: 9:30 AM – 5:30 PM",
          hi: getContactVal(settings, "officeHoursMFHi") || "सोमवार – शुक्रवार: सुबह 9:30 – शाम 5:30",
        },
        {
          en: getContactVal(settings, "officeHoursSatEn") || "Saturday: 10:00 AM – 2:00 PM",
          hi: getContactVal(settings, "officeHoursSatHi") || "शनिवार: सुबह 10:00 – दोपहर 2:00",
        },
        {
          en: getContactVal(settings, "officeHoursSunEn") || "Sunday & Gazetted Holidays: Closed",
          hi: getContactVal(settings, "officeHoursSunHi") || "रविवार और राजपत्रित अवकाश: बंद",
        },
      ],
    },
  ];

  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicCards.map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--color-secondary)] mb-3">
              {card.title[lang]}
            </h3>
            <div className="w-8 h-[2px] bg-[var(--color-primary)] mb-3 rounded" />
            <div className="space-y-1">
              {card.lines.map((line, j) => (
                <p key={j} className="text-xs text-gray-600 leading-relaxed">
                  {line[lang]}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const MapSection = ({ settings }) => {
  const { lang } = useLanguage();

  const mapUrl =
    getContactVal(settings, "googleMapsUrl") ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5445606837786!2d77.2090057!3d28.6328247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000";

  return (
    <section className="px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)]">
            {lang === "en" ? "Our Location" : "हमारा स्थान"}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded" />
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            title="HLMF Office Location"
            src={mapUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>

        <p className="text-[11px] text-gray-500 mt-3 text-center italic">
          {lang === "en"
            ? "Visitors are requested to schedule appointments in advance via email or phone."
            : "आगंतुकों से अनुरोध है कि ईमेल या फोन के माध्यम से पहले से अपॉइंटमेंट शेड्यूल करें।"}
        </p>
      </div>
    </section>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Contact = () => {
  const [settings, setSettings] = useState(null);

  React.useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.settings) setSettings(res.settings);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <Navbar />
      <ContactHero />
      <ContactForm settings={settings} />
      <ContactCards settings={settings} />
      <MapSection settings={settings} />
      <Footer />
    </div>
  );
};

export default Contact;
