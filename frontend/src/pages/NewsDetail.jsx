import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getNewsById } from "../api";
import { toast } from "sonner";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const languageFallback = (textObj, lang) => {
  if (!textObj) return "";
  return textObj[lang] || textObj["en"] || textObj["hi"] || "";
};

const NewsDetail = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsById(id)
      .then((res) => {
        if (res.success) {
          setNews(res.news);
        } else {
          toast.error(lang === "en" ? "Article not found" : "लेख नहीं मिला");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(lang === "en" ? "Failed to load article" : "लेख लोड करने में विफल");
      })
      .finally(() => setLoading(false));
  }, [id, lang]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(lang === "en" ? "Link copied to clipboard!" : "लिंक क्लिपबोर्ड पर कॉपी हो गया!");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-[var(--color-bg)] min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
          {lang === "en" ? "Loading article details..." : "लेख विवरण लोड हो रहा है..."}
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="bg-[var(--color-bg)] min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-lg font-bold text-gray-600">
            {lang === "en" ? "Article Not Found" : "लेख नहीं मिला"}
          </p>
          <Link
            to="/news"
            className="mt-4 inline-block text-xs font-bold text-[var(--color-primary-dark)] uppercase tracking-wider"
          >
            {lang === "en" ? "← Back to News" : "← समाचार पर वापस"}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-16 print:py-0">
        {/* Back and Utility bar */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/news"
            className="text-xs font-bold text-gray-500 hover:text-[var(--color-secondary)] uppercase tracking-widest transition-colors"
          >
            {lang === "en" ? "← Back to Press" : "← प्रेस पर वापस"}
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer text-gray-600"
            >
              <span>🔗</span> {lang === "en" ? "Share" : "साझा करें"}
            </button>
            <button
              onClick={handlePrint}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer text-gray-600"
            >
              <span>🖨️</span> {lang === "en" ? "Print" : "प्रिंट"}
            </button>
          </div>
        </div>

        {/* Official Letterhead Container */}
        <div
          className="bg-white rounded-2xl shadow-xl border border-gray-150 p-6 md:p-12 print:border-0 print:shadow-none print:p-0"
          style={{ animation: "slideUp 0.4s ease-out" }}
        >
          {/* Header Graphic */}
          <div className="text-center pb-8 border-b-2 border-[var(--color-primary)]">
            <h2 className="text-[var(--color-secondary)] uppercase font-bold text-[10px] tracking-widest mb-1.5">
              {lang === "en" ? "Official Press Release" : "आधिकारिक प्रेस विज्ञप्ति"}
            </h2>
            <h1 className="text-xl md:text-2xl font-black uppercase text-gray-800 tracking-wide font-serif">
              {lang === "en" ? "Heeralal Memorial Foundation" : "हीरालाल मेमोरियल फाउंडेशन"}
            </h1>
            <p className="text-[10px] text-[var(--color-primary-dark)] font-semibold italic mt-1">
              {lang === "en"
                ? "Committed to Equality, Empowerment, and Sustainable Change"
                : "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये"}
            </p>
          </div>

          {/* Release Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 mb-8 text-xs font-semibold text-gray-500 pb-3 border-b border-gray-100">
            <span className="bg-[var(--color-primary-light)] text-[var(--color-secondary)] px-3 py-1 rounded-full uppercase tracking-wider text-[10px] font-bold">
              {news.tag}
            </span>
            <span className="font-mono">
              {lang === "en" ? "Date of Release: " : "विज्ञप्ति तिथि: "}
              {news.date}
            </span>
          </div>

          {/* Main Title Heading */}
          <h2
            className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] tracking-normal mb-8 leading-snug font-serif"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {languageFallback(news.title, lang)}
          </h2>

          {/* News Image Display */}
          {news.image && (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md mb-8 max-h-[450px]">
              <img
                src={`${BACKEND}/uploads/news/${news.image}`}
                alt={languageFallback(news.title, lang)}
                className="w-full h-auto object-cover max-h-[450px]"
              />
            </div>
          )}

          {/* Press Release Content Text */}
          <div className="prose max-w-none text-gray-800 text-sm md:text-base leading-relaxed space-y-6">
            <p>
              {lang === "en" ? (
                <>
                  The Secretariat of the Heeralal Memorial Foundation is pleased to release the details and highlight updates regarding this announcement. The initiative represents our continued dedication to the values of community development, education empowerment, health advancement, and environmental sustainability.
                </>
              ) : (
                <>
                  हीरालाल मेमोरियल फाउंडेशन का सचिवालय इस घोषणा के संबंध में विवरण और नवीनतम अपडेट जारी करते हुए प्रसन्न है। यह पहल सामुदायिक विकास, शिक्षा सशक्तिकरण, स्वास्थ्य उन्नति और पर्यावरणीय स्थिरता के मूल्यों के प्रति हमारे निरंतर समर्पण का प्रतिनिधित्व करती है।
                </>
              )}
            </p>
            <p>
              {lang === "en" ? (
                <>
                  For further information and press inquiries, please contact the communications department of the Foundation via the official contact channels.
                </>
              ) : (
                <>
                  अधिक जानकारी और प्रेस पूछताछ के लिए, कृपया आधिकारिक संपर्क चैनलों के माध्यम से फाउंडेशन के संचार विभाग से संपर्क करें।
                </>
              )}
            </p>
          </div>

          {/* Signatures / Official Seal */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <div>
              <p className="font-bold text-gray-600 uppercase tracking-wider text-[10px]">
                {lang === "en" ? "Issued By" : "द्वारा जारी"}
              </p>
              <p className="mt-1 text-gray-500 font-semibold">
                {lang === "en" ? "HLMF Communications & Media Secretariat" : "एचएलएमएफ संचार और मीडिया सचिवालय"}
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center font-bold text-[10px] text-[var(--color-secondary)] border border-[var(--color-primary)] mb-1 mx-auto md:ml-auto">
                HLMF
              </div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
                {lang === "en" ? "OFFICIAL SEAL" : "आधिकारिक मुहर"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer topBg="bg-[var(--color-bg)]" />
      </div>

      {/* Slide Up Keyframes */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NewsDetail;
