import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "../assets/image.png";
import MemoryPhoto from "../assets/memory.jpeg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

import { getHomeData } from "../api";

const pillars = [
  {
    id: 1,
    icon: "📚",
    title: {
      en: "Educational Upliftment",
      hi: "शैक्षिक उत्थान",
    },
    desc: {
      en: "Providing scholarships and infrastructure support to ensure no child is left behind in the digital age.",
      hi: "छात्रवृत्ति और बुनियादी ढांचे के माध्यम से हर बच्चे तक शिक्षा पहुँचाना।",
    },
  },
  {
    id: 2,
    icon: "🏥",
    title: {
      en: "Healthcare Initiatives",
      hi: "स्वास्थ्य पहल",
    },
    desc: {
      en: "Mobile medical units and sanitation drives reaching the heart of underserved communities.",
      hi: "मोबाइल चिकित्सा और स्वच्छता अभियानों के माध्यम से सेवा।",
    },
  },
  {
    id: 3,
    icon: "🌱",
    title: {
      en: "Environmental Advocacy",
      hi: "पर्यावरण संरक्षण",
    },
    desc: {
      en: "Institutional commitment to afforestation and water conservation for a sustainable future.",
      hi: "हरित भविष्य हेतु वृक्षारोपण और जल संरक्षण।",
    },
  },
  {
    id: 4,
    icon: "⚖️",
    title: {
      en: "Women Empowerment",
      hi: "महिला सशक्तिकरण",
    },
    desc: {
      en: "Vocational training and financial literacy programs designed for long-term self-reliance.",
      hi: "आत्मनिर्भरता हेतु कौशल और वित्तीय शिक्षा।",
    },
  },
];

const compliancePoints = [
  {
    title: {
      en: "Tax Exemption",
      hi: "कर छूट",
    },
    desc: {
      en: "Registered under Section 12A & 80G of the Income Tax Act.",
      hi: "आयकर अधिनियम की धारा 12A और 80G के तहत पंजीकृत।",
    },
  },
  {
    title: {
      en: "Data Privacy",
      hi: "डेटा गोपनीयता",
    },
    desc: {
      en: "ISO 27001 compliant data management systems.",
      hi: "ISO 27001 अनुरूप डेटा प्रबंधन प्रणाली।",
    },
  },
  {
    title: {
      en: "Annual Audits",
      hi: "वार्षिक ऑडिट",
    },
    desc: {
      en: "Transparent reporting by empaneled auditors.",
      hi: "पैनल ऑडिटर्स द्वारा पारदर्शी रिपोर्टिंग।",
    },
  },
];

const stripText = (text, maxLength = 200) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974";
const languageFallback = (textObj, lang) => {
  return textObj[lang] || textObj["en"] || textObj["hi"] || "N/A";
};

const Hero = ({ slides }) => {
  const { lang } = useLanguage();
  return (
    <section>
      <div>
        {slides.length === 0 ? (
          <div className="relative md:h-120 h-72 w-full">
            <img
              src={fallbackImage}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Fallback Image"
            />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            loop={slides.length > 2}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative md:h-120 h-72 w-full px-4">
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/uploads/heroSlides/" +
                      slide.image
                    }
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Image"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
                  <div className="relative z-10 h-full flex flex-col justify-center max-w-6xl mx-auto">
                    <h1 className="text-white text-2xl md:text-5xl font-semibold tracking-wide">
                      {languageFallback(stripText(slide.title), lang)}
                    </h1>
                    <p className="text-gray-300 md:mt-4 mt-1 md:text-lg text-sm max-w-2xl leading-relaxed">
                      {languageFallback(stripText(slide.subtitle), lang)}
                    </p>
                    <div className="flex gap-4 md:mt-8 mt-2">
                      <Button className="max-md:text-xs" to="/about">
                        {lang === "en" ? "Learn More" : "अधिक जानें"}
                      </Button>
                      <Button
                        className="max-md:text-xs"
                        variant="outline"
                        to="/contact"
                      >
                        {lang === "en" ? "Contact Us" : "संपर्क करें"}
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

const UpcomingEvents = ({ events }) => {
  const { lang } = useLanguage();

  return (
    <section className="bg-[var(--color-primary)] border-y border-gray-200 text-black py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Label + Slider */}
        <div className="flex items-center gap-2 flex-1 items-center overflow-hidden">
          <Button
            variant="secondary"
            size="sm"
            className="text-xs bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]"
          >
            {lang === "en" ? "Upcoming" : "आगामी"}
          </Button>

          {events.length === 0 ? (
            <p className="text-sm italic font-bold">
              {lang === "en" ? "No Upcoming Events" : "कोई आगामी घटना नहीं"}
            </p>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={events.length > 2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                prevEl: ".event-prev",
                nextEl: ".event-next",
              }}
              className="w-full"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <p className="md:text-sm text-xs font-medium truncate">
                    {event.title[lang]}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1">
          <button className="event-prev p-1 rounded-full hover:bg-black/10 transition">
            <FiChevronLeft size={12} />
          </button>
          <button className="event-next p-1 rounded-full hover:bg-black/10 transition">
            <FiChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

const SacredMemory = () => {
  const { lang } = useLanguage();

  const title = {
    en: "In Loving Memory of Late Shree Heeralal Yadav",
    hi: "स्वर्गीय श्री हीरालाल यादव की प्रेमपूर्ण स्मृति में",
  };

  const role = {
    en: "Founding Inspiration",
    hi: "संस्थापक प्रेरणा",
  };

  const quote = {
    en: "His life was dedicated to community service and educational welfare through data driven and sustainable interventions. Since our inception, we carry forward his legacy of selfless service, equality, and empowerment — touching lives across rural India with dignity and compassion.",
    hi: "उनका जीवन डेटा संचालित और टिकाऊ हस्तक्षेपों के माध्यम से सामुदायिक सेवा और शैक्षिक कल्याण के लिए समर्पित था। अपनी स्थापना के बाद से, हम उनकी निःस्वार्थ सेवा, समानता और सशक्तिकरण की विरासत को आगे बढ़ा रहे हैं — गरिमा और करुणा के साथ ग्रामीण भारत में जीवन को छू रहे हैं।",
  };

  return (
    <section className="px-4 py-10">
      <div className="border-3 border-[var(--color-primary)] bg-white shadow-sm max-w-6xl mx-auto md:p-10 p-4 rounded">
        <div className="flex max-md:flex-col md:gap-10 gap-4 max-w-6xl mx-auto items-center">
          <img
            src={MemoryPhoto}
            alt="Late Shree Heeralal Yadav"
            className="max-w-80 object-cover border-2 border-gray-500 p-1"
          />
          <div>
            <h2 className="text-2xl font-bold md:text-3xl uppercase text-[var(--color-secondary)]">
              {languageFallback(title, lang)}
            </h2>
            <p className="text-[var(--color-primary-dark)] italic">
              {languageFallback(role, lang)}
            </p>
            <div className="w-16 h-0.5 bg-[var(--color-primary)] my-6 rounded"></div>
            <p className="text-sm">{languageFallback(quote, lang)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormalCommendation = ({ commendation }) => {
  const { lang } = useLanguage();

  if (!commendation) return null;

  return (
    <section className="px-4 py-14">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <span className="block uppercase text-[var(--color-primary-dark)] text-xs font-semibold tracking-widest">
          {languageFallback(commendation.sectionSubtitle, lang) || (lang === "en" ? "Institutional Patronage" : "संस्थागत संरक्षण")}
        </span>
        <h2 className="text-2xl font-bold md:text-3xl uppercase text-[var(--color-secondary)] mt-1">
          {languageFallback(commendation.sectionTitle, lang) || (lang === "en" ? "Formal Commendation" : "औपचारिक प्रशंसा")}
        </h2>
        <div className="w-20 h-1 bg-[var(--color-primary-dark)] my-4 mx-auto rounded"></div>
      </div>

      {/* Golden Glittery Container */}
      <div
        className="max-w-6xl mx-auto rounded-2xl p-[3px]"
        style={{
          background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 20%, #c9952c 35%, #fffbe6 50%, #d4a017 65%, #f0c94d 80%, #9c7a10 100%)",
          backgroundSize: "200% 200%",
          animation: "goldenShimmer 4s ease-in-out infinite",
          boxShadow: "0 0 20px rgba(212, 160, 23, 0.3), 0 0 40px rgba(212, 160, 23, 0.1)",
        }}
      >
        <div className="bg-[var(--color-primary-light)] rounded-2xl md:p-10 p-5">
          <div className="flex max-md:flex-col md:gap-10 gap-8">

            {/* LEFT COLUMN — Director Photo + Message of Hope */}
            <div className="md:w-[40%] flex flex-col items-center">
              {/* Director Photo with decorative golden border */}
              <div
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-[4px] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 25%, #c9952c 50%, #fffbe6 75%, #d4a017 100%)",
                  backgroundSize: "200% 200%",
                  animation: "goldenShimmer 3s ease-in-out infinite",
                  boxShadow: "0 0 24px rgba(212, 160, 23, 0.35)",
                }}
              >
                {/* Inner decorative ring */}
                <div className="w-full h-full rounded-full p-[3px] bg-white">
                  <img
                    src={commendation.directorPhoto ? `${import.meta.env.VITE_BACKEND_URL}/uploads/commendation/${commendation.directorPhoto}` : fallbackImage}
                    alt={lang === "en" ? "Director's Photo" : "निदेशक की फोटो"}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="mt-5 text-lg md:text-xl font-bold text-[var(--color-secondary)] text-center">
                {languageFallback(commendation.directorName, lang) || (lang === "en" ? "Director's Name" : "निदेशक का नाम")}
              </h3>
              <p className="text-xs text-[var(--color-primary-dark)] italic text-center">
                {languageFallback(commendation.directorPost, lang) || (lang === "en" ? "Director's Position" : "निदेशक का पद")}
              </p>

              {/* Message of Hope */}
              <div className="mt-6 w-full bg-white rounded-xl p-5 shadow-sm border border-[var(--color-primary)]">
                <p
                  className="text-base font-semibold text-[var(--color-secondary)] mb-3 pb-2"
                  style={{ borderBottom: "2px solid var(--color-primary)" }}
                >
                  {languageFallback(commendation.messageTitle, lang) || (lang === "en" ? "Message of Hope" : "आशा का संदेश")}
                </p>
                {commendation.messageBody && (
                  <p className="text-sm italic text-gray-600 leading-relaxed">
                    "{languageFallback(commendation.messageBody, lang)}"
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN — Letter Image */}
            <div className="md:w-[60%] flex items-center justify-center">
              <div className="bg-white p-3 md:p-5 rounded-xl shadow-md border border-gray-200 w-full">
                <img
                  src={commendation.letterImage ? `${import.meta.env.VITE_BACKEND_URL}/uploads/commendation/${commendation.letterImage}` : fallbackImage}
                  alt={lang === "en" ? "Formal Commendation Letter" : "औपचारिक प्रशंसा पत्र"}
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Shimmer Animation */}
      <style>{`
        @keyframes goldenShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

const InstitutionalProgress = ({ stats }) => {
  const { lang } = useLanguage();

  if (!stats) return null;

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-6xl mx-auto border border-gray-200 rounded-lg bg-white md:p-10 p-6 shadow-sm">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Institutional Progress" : "संस्थागत प्रगति"}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en" ? "Impact At A Glance" : "प्रभाव एक नज़र में"}
          </h2>

          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item) => (
            <div
              key={item._id}
              className="bg-[var(--color-primary-light)] hover:shadow-md transition rounded-md p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{item.icon}</div>

              <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-secondary)]">
                {item.value}
              </h3>

              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {languageFallback(item.label, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstitutionalPillars = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Our Core Mission" : "हमारा मुख्य उद्देश्य"}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en"
              ? "Pillars of Institutional Impact"
              : "संस्थागत प्रभाव के स्तंभ"}
          </h2>

          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-md p-6 text-center hover:shadow-lg transition group hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-3xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
                {item.title[lang]}
              </h3>

              {/* Divider */}
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3"></div>

              {/* Description */}
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

const LatestFromField = ({ posts }) => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT: POSTS */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">
              {lang === "en" ? "Latest from the Field" : "मैदान से नवीनतम"}
            </h2>

            <button className="text-xs border px-3 py-1 rounded hover:bg-gray-100">
              {lang === "en" ? "All Press Releases" : "सभी प्रेस विज्ञप्ति"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-lg group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={import.meta.env.VITE_BACKEND_URL + "/uploads/news/" + post.image}
                    alt=""
                    className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] bg-[var(--color-primary-light)] text-black font-semibold px-2 py-1 rounded">
                    {post.tag}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wide">
                    {post.date}
                  </p>

                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-secondary)]">
                    {languageFallback(post.title, lang)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: COMPLIANCE PANEL */}
        <div className="bg-[image:var(--gradient-secondary)] text-white p-6 rounded shadow-lg">
          <div className="relative z-10">
            <h3 className="text-lg uppercase tracking-widest mb-4 text-[var(--color-primary)] font-bold">
              {lang === "en" ? "Institutional Compliance" : "संस्थागत अनुपालन"}
            </h3>

            <ul className="space-y-4 list-disc pl-5 marker:text-[var(--color-primary)]">
              {compliancePoints.map((item, i) => (
                <li key={i}>
                  <p className="text-sm font-semibold">{item.title[lang]}</p>
                  <p className="text-xs text-gray-200 leading-relaxed mt-1">
                    {item.desc[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [events, setEvents] = useState([]);

  const [commendation, setCommendation] = useState(null);
  const [stats, setStats] = useState([]);
  // const [pillars, setPillars] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [compliancePoints, setCompliancePoints] = useState([]);

  useEffect(() => {
    getHomeData()
      .then((res) => {
        setSlides(res.data.heroSlides || []);
        setEvents(res.data.events || []);

        setCommendation(res.data.commendation || null);
        setStats(res.data.stats);
        // setPillars(res.data.pillars);
        setPosts(res.data.news);
        // setCompliancePoints(res.data.compliancePoints);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero slides={slides} />
      <UpcomingEvents events={events} />
      <SacredMemory />
      <FormalCommendation commendation={commendation} />
      <InstitutionalProgress stats={stats} />
      <InstitutionalPillars />
      <LatestFromField posts={posts} />
      <Footer topBg="bg-white" />
    </div>
  );
};

export default Home;
