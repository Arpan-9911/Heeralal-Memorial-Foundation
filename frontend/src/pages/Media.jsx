import React from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* ──────────────────────────────────── DATA ──────────────────────────────────── */

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1974",
    alt: "City skyline",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974",
    alt: "Nature landscape",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1974",
    alt: "Urban architecture",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
    alt: "Road through mountains",
  },
];

const videoData = {
  thumbnail:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974",
  caption: {
    en: "Documentary: Journey of Change (2023-24)",
    hi: "डॉक्यूमेंट्री: बदलाव की यात्रा (2023-24)",
  },
};

const announcements = [
  {
    id: 1,
    date: "Nov 14, 2024",
    title: {
      en: "HLMF signs MOU with Central Delhi Education Department for Vocational Training",
      hi: "HLMF ने व्यावसायिक प्रशिक्षण के लिए मध्य दिल्ली शिक्षा विभाग के साथ MOU पर हस्ताक्षर किए",
    },
    excerpt: {
      en: "New Delhi: The Heeralal Memorial Foundation has formally entered into a partnership aimed at enhancing the employability of urban youth...",
      hi: "नई दिल्ली: हीरालाल मेमोरियल फाउंडेशन ने औपचारिक रूप से शहरी युवाओं की रोजगार क्षमता बढ़ाने के उद्देश्य से एक साझेदारी में प्रवेश किया है...",
    },
  },
  {
    id: 2,
    date: "Oct 29, 2024",
    title: {
      en: "Successful completion of 'Swasthya Seva' phase 1 in Outer Delhi Clusters",
      hi: "'स्वास्थ्य सेवा' चरण 1 का बाहरी दिल्ली क्लस्टरों में सफल समापन",
    },
    excerpt: {
      en: "Outer Delhi: Over 5,000 residents were provided free health screenings and primary consultation under the foundation's healthcare wing...",
      hi: "बाहरी दिल्ली: फाउंडेशन के स्वास्थ्य सेवा विंग के तहत 5,000 से अधिक निवासियों को मुफ्त स्वास्थ्य जांच और प्राथमिक परामर्श प्रदान किया गया...",
    },
  },
];

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const PressGallery = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
        <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
          {lang === "en" ? "Press Gallery" : "प्रेस गैलरी"}
        </h3>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-lg border border-gray-100 group cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoResources = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-[var(--color-primary)] rounded" />
        <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
          {lang === "en" ? "Video Resources" : "वीडियो संसाधन"}
        </h3>
      </div>

      {/* Video Thumbnail */}
      <div className="relative rounded-lg overflow-hidden group cursor-pointer">
        <img
          src={videoData.thumbnail}
          alt="Documentary thumbnail"
          className="w-full h-60 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[var(--color-secondary)] bg-opacity-90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-gray-600 mt-3 italic">
        {videoData.caption[lang]}
      </p>
    </div>
  );
};

const LatestAnnouncements = () => {
  const { lang } = useLanguage();

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="bg-[var(--color-secondary)] px-6 py-4 border-l-4 border-[var(--color-primary)]">
        <h3 className="text-white font-bold text-lg">
          {lang === "en" ? "Latest Announcements" : "नवीनतम घोषणाएँ"}
        </h3>
      </div>

      {/* Announcements List */}
      <div className="bg-white divide-y divide-gray-100">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="px-6 py-5 hover:bg-[var(--color-primary-light)] transition-colors duration-200 cursor-pointer group"
          >
            <p className="text-[11px] text-[var(--color-secondary)] font-semibold uppercase tracking-wider mb-1">
              {item.date}
            </p>
            <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
              {item.title[lang]}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {item.excerpt[lang]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────── MAIN PAGE ─────────────────────────────────── */

const Media = () => {
  const { lang } = useLanguage();

  return (
    <div>
      <Navbar />

      {/* Page Content */}
      <div className="bg-[var(--color-bg)] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-14">
          {/* Page Title */}
          <div className="mb-6">
            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {lang === "en" ? "Media Center" : "मीडिया केंद्र"}
            </h1>
            <div className="w-full h-[2px] bg-[var(--color-primary)] mt-3 rounded" />
          </div>

          {/* Press Gallery + Video Resources */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 show">
            <PressGallery />
            <VideoResources />
          </section>

          {/* Latest Announcements */}
          <section className="show">
            <LatestAnnouncements />
          </section>
        </div>
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Media;
