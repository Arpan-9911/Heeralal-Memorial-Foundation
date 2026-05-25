import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getPatrons } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const t = (obj, lang) => (obj && (obj[lang] || obj.en || obj.hi)) || "";

const Patrons = () => {
  const { lang } = useLanguage();
  const [patrons, setPatrons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatrons()
      .then((data) => {
        setPatrons(data || []);
      })
      .catch((err) => {
        console.error("Error fetching patrons:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-[var(--color-bg)] min-h-[60vh] py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Page Title Section */}
          <div className="mb-12 text-center">
            <h1
              className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] italic font-serif"
            >
              {lang === "en" ? "Our Patrons" : "हमारे संरक्षक"}
            </h1>
            <div className="w-24 h-[2px] bg-[var(--color-primary)] mt-3 mx-auto rounded" />
            <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
              {lang === "en"
                ? "Meet the pillars of support and guiding visionaries of the Heeralal Memorial Foundation."
                : "हीरालाल मेमोरियल फाउंडेशन के सहायक स्तंभों और मार्गदर्शक दूरदर्शियों से मिलें।"}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && patrons.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              {lang === "en" ? "No patrons found." : "कोई संरक्षक नहीं मिला।"}
            </div>
          )}

          {/* Cards Grid */}
          {!loading && patrons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
              {patrons.map((patron) => {
                const name = t(patron.name, lang);
                const role = t(patron.role, lang);
                const quote = t(patron.quote, lang);

                return (
                  <div
                    key={patron._id}
                    className="relative bg-white rounded-[2rem] border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-visible pb-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    {/* Top Golden Header Band */}
                    <div 
                      className="w-full h-32 rounded-t-[2rem]"
                      style={{
                        background: "linear-gradient(135deg, #a3822d 0%, #c9952c 50%, #8b6914 100%)",
                      }}
                    />

                    {/* Concentric Double Golden Circular Profile Avatar */}
                    <div className="relative -mt-20 z-10">
                      {/* Outer Ring */}
                      <div
                        className="w-36 h-36 rounded-full p-[2.5px] shadow-lg flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 30%, #c9952c 70%, #d4a017 100%)",
                        }}
                      >
                        {/* White spacer */}
                        <div className="w-full h-full rounded-full p-[3px] bg-white flex items-center justify-center">
                          {/* Inner gold border */}
                          <div 
                            className="w-full h-full rounded-full p-[1.5px]"
                            style={{
                              background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 30%, #c9952c 70%, #d4a017 100%)",
                            }}
                          >
                            {/* Inner white spacer & Image container */}
                            <div className="w-full h-full rounded-full p-[2px] bg-white">
                              <img
                                src={`${BACKEND}/uploads/patrons/${patron.photo}`}
                                alt={name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Patron Name */}
                    <h3 className="text-xl font-bold mt-5 text-gray-900 font-serif px-4">
                      {name}
                    </h3>

                    {/* Subtitle / Role in Spaced Gold Uppercase */}
                    <p className="mt-1 text-[10px] tracking-[0.25em] font-semibold text-[#a3822d] uppercase px-4">
                      {role}
                    </p>

                    {/* Horizontal Decorative Separator Line */}
                    <div className="w-12 h-[3px] bg-[#c9952c] mt-4 mb-4 rounded-full" />

                    {/* Patron Quote */}
                    {quote && (
                      <p 
                        className="text-gray-600 text-sm leading-relaxed px-6 italic"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        “{quote}”
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Patrons;
