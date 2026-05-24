import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getNews } from "../api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const languageFallback = (textObj, lang) => {
  if (!textObj) return "";
  return textObj[lang] || textObj["en"] || textObj["hi"] || "";
};

const News = () => {
  const { lang } = useLanguage();
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    getNews()
      .then((res) => {
        const posts = res.news || [];
        setNewsList(posts);
        setFilteredNews(posts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    if (tag === "All") {
      setFilteredNews(newsList);
    } else {
      setFilteredNews(newsList.filter((item) => item.tag === tag));
    }
  };

  const tags = ["All", "Press Release", "Event", "Update"];

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] italic animate-fadeIn"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {lang === "en" ? "Press & Announcements" : "प्रेस और घोषणाएँ"}
          </h1>
          <div className="w-full h-[2px] bg-[var(--color-primary)] mt-3 rounded" />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                selectedTag === tag
                  ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-primary)]"
              }`}
            >
              {lang === "hi" && tag === "All" ? "सभी" : tag}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            {lang === "en" ? "Loading news articles..." : "समाचार लेख लोड हो रहे हैं..."}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-20 text-center text-gray-500 border border-dashed border-gray-200 bg-white rounded-lg">
            <p className="text-sm font-semibold">
              {lang === "en" ? "No articles found in this category." : "इस श्रेणी में कोई लेख नहीं मिला।"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Link
                key={item._id}
                to={`/news/${item._id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-55 shadow-inner">
                  {item.image ? (
                    <img
                      src={`${BACKEND}/uploads/news/${item.image}`}
                      alt={languageFallback(item.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-gray-400">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider bg-white/95 text-[var(--color-secondary)] px-2.5 py-1 rounded shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                      {item.date}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-[var(--color-secondary)] transition-colors duration-200 line-clamp-2 leading-snug">
                      {languageFallback(item.title, lang)}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-[var(--color-primary-dark)] uppercase tracking-wider">
                      {lang === "en" ? "View Release" : "विज्ञप्ति देखें"}
                    </span>
                    <span className="text-xs text-[var(--color-primary-dark)] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default News;
