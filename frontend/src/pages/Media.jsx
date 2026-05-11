import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getMedia, getAnnouncements } from "../api";

/* ────────────────────────── SECTION COMPONENTS ───────────────────────────── */

const PressGallery = ({ galleryImages }) => {
  const { lang } = useLanguage();
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          {lang === "en" ? "No Press Gallery Found" : "प्रेस गैलरी नहीं मिला"}
        </p>
      </div>
    );
  }

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
            key={img._id}
            className="overflow-hidden rounded-lg border border-gray-100 group cursor-pointer"
          >
            <img
              src={import.meta.env.VITE_BACKEND_URL + "/uploads/media/images/" + img.image}
              alt={img.alt}
              className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoResources = ({ videoData }) => {
  const { lang } = useLanguage();
  if (!videoData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          {lang === "en" ? "No Video Resources Found" : "कोई वीडियो संसाधन नहीं मिला"}
        </p>
      </div>
    );
  }
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
        <video src={import.meta.env.VITE_BACKEND_URL + "/uploads/media/video/" + videoData.file} controls className="w-full h-60 object-cover" />
      </div>

      {/* Caption */}
      <p className="text-xs text-gray-600 mt-3 italic">
        {videoData.caption[lang] || (lang === "en" ? "No caption available." : "कोई कैप्शन उपलब्ध नहीं है।")}
      </p>
    </div>
  );
};

const LatestAnnouncements = ({ announcements }) => {
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
            key={item._id}
            className="px-6 py-5 hover:bg-[var(--color-primary-light)] transition-colors duration-200 cursor-pointer group"
          >
            <p className="text-[11px] text-[var(--color-secondary)] font-semibold uppercase tracking-wider mb-1">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[var(--color-secondary)] transition-colors duration-200">
              {item.title[lang] || (lang === "en" ? "No title available." : "कोई शीर्षक उपलब्ध नहीं है।")}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {item.excerpt[lang] || (lang === "en" ? "No excerpt available." : "कोई सारांश उपलब्ध नहीं है।")}
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
  const [galleryImages, setGalleryImages] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    // Fetch media data from API
    const fetchMediaData = async () => {
      try {
        const mediaResponse = await getMedia();
        const announcementsResponse = await getAnnouncements();
        setGalleryImages(mediaResponse.media.images);
        setVideoData(mediaResponse.media.video);
        setAnnouncements(announcementsResponse.announcements);
        console.log("Announcements data fetched successfully:", announcementsResponse);
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaData();
  }, []);

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
            <PressGallery galleryImages={galleryImages} />
            <VideoResources videoData={videoData} />
          </section>

          {/* Latest Announcements */}
          <section className="show">
            <LatestAnnouncements announcements={announcements} />
          </section>
        </div>
      </div>

      <Footer topBg="bg-[var(--color-bg)]" />
    </div>
  );
};

export default Media;
