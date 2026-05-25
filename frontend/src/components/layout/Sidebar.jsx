import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { FiX } from "react-icons/fi";

const Sidebar = ({ open, setOpen }) => {
  const { lang, changeLanguage } = useLanguage();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">
            {lang === "en" ? "MENU" : "मेनू"}
          </h2>
          <button onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Links — Same order as desktop navbar */}
        <div className="flex flex-col p-4 gap-4 text-sm font-medium">
          <Link to="/" onClick={() => setOpen(false)}>{lang === "en" ? "HOME" : "होम"}</Link>
          <Link to="/about" onClick={() => setOpen(false)}>{lang === "en" ? "ABOUT US" : "हमारे बारे में"}</Link>
          <Link to="/patrons" onClick={() => setOpen(false)}>{lang === "en" ? "PATRONS" : "संरक्षक"}</Link>
          <Link to="/achievements" onClick={() => setOpen(false)}>{lang === "en" ? "ACHIEVEMENTS" : "उपलब्धियाँ"}</Link>
          <Link to="/programs" onClick={() => setOpen(false)}>{lang === "en" ? "PROGRAM" : "प्रोग्राम"}</Link>
          <Link to="/commendations" onClick={() => setOpen(false)}>{lang === "en" ? "COMMENDATIONS" : "प्रशंसापत्र"}</Link>
          <Link to="/media" onClick={() => setOpen(false)}>{lang === "en" ? "MEDIA" : "मीडिया"}</Link>
          <Link to="/join-us" onClick={() => setOpen(false)}>{lang === "en" ? "JOIN US" : "जुड़ें"}</Link>
          <Link to="/teams" onClick={() => setOpen(false)}>{lang === "en" ? "TEAM" : "टीम"}</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>{lang === "en" ? "CONTACT US" : "संपर्क करें"}</Link>

          {/* Donate Button */}
          <Link
            to="/donate"
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 rounded-lg text-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 30%, #c9952c 60%, #d4a017 100%)",
              color: "#4a120e",
              boxShadow: "0 3px 0 #8b6914, 0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {lang === "en" ? "SUPPORT & DONATE" : "समर्थन एवं दान"}
          </Link>
        </div>

        {/* Language Switch */}
        <div className="absolute bottom-6 left-4 right-4 flex items-center gap-2 text-sm">
          <button
            onClick={() => changeLanguage("en")}
            className={lang === "en" ? "font-bold" : ""}
          >
            English
          </button>
          <span>|</span>
          <button
            onClick={() => changeLanguage("hi")}
            className={lang === "hi" ? "font-bold" : ""}
          >
            हिंदी
          </button>
          <span>|</span>
          <a
            href="https://admin.hlmfofficial.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;