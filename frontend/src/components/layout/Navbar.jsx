import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Topbar = () => {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div>
      <div className="bg-[var(--color-secondary)]">
        <div className="max-w-7xl mx-auto text-white text-xs px-4 py-1 flex justify-between items-center max-md:hidden">
          <div>
            <span className="font-semibold text-[var(--color-primary)]">
              {lang === "en" ? "LATEST:" : "अधिसूचना:"}
            </span>{" "}
            {lang === "en"
              ? "Heeralal Memorial Foundation expands education reach..."
              : "हीरलल मेमोरियल फाउंडेशन शिक्षा पहुंच को विकसित करता है..."}
          </div>
          <div>
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className={lang === "en" ? "text-[var(--color-primary)]" : "cursor-pointer"}
              >
                English
              </button>
              <span>|</span>
              <button
                onClick={() => changeLanguage("hi")}
                className={lang === "hi" ? "text-[var(--color-primary)]" : "cursor-pointer"}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link to={"/"} className="flex items-center gap-4">
          <div className="min-h-12 min-w-12 h-12 w-12 rounded-full bg-[var(--color-secondary)]" />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-secondary)] tracking-wide">
              {lang === "en"
                ? "Heeralal Memorial Foundation"
                : "हीरलल मेमोरियल फाउंडेशन"}
            </h1>
            <p className="text-xs text-[var(--color-primary)] italic">
              {lang === "en"
                ? "Committed to Equality, Empowerment, and Sustainable Change"
                : "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये"}
            </p>
          </div>
        </Link>
        <div className="text-xs text-gray-600 text-right space-y-1 max-md:hidden">
          <div>NGO Reg No: DL/2023/...</div>
          <div>ESTD: 29, 2023</div>
          <div>CIN: U88900DL2023...</div>
        </div>
      </div>
    </div>
  );
};

const MainNav = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-secondary)] shadow-md">
        <div className="text-white px-4 py-3 flex items-center justify-between md:justify-center relative">
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(true)}
          >
            <FiMenu />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-40 w-full">
            
            <div className="flex justify-end gap-16 text-xs font-medium flex-1">
              <Link to={"/"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "HOME" : "होम"}</Link>
              <Link to={"/about"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "ABOUT US" : "हमारे बारे में"}</Link>
              <Link to={"/media"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "MEDIA" : "मीडिया"}</Link>
            </div>

            {/* Center Diamond */}
            <Link
              to={"/donate"}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <div className="w-16 h-16 rotate-45 bg-[var(--color-primary)] rounded flex items-center justify-center hover:scale-105 transition duration-300">
                <span className="-rotate-45 text-[10px] font-bold text-black text-center">
                  {lang === "en" ? "SUPPORT" : "समर्थन"}
                  <br />
                  {lang === "en" ? "& DONATE" : "एवं दान"}
                </span>
              </div>
            </Link>

            <div className="flex gap-16 text-xs font-medium flex-1">
              <Link to={"/achievements"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "ACHIEVEMENTS" : "उत्पादन" }</Link>
              <Link to={"/programs"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "PROGRAMS" : "प्रोग्राम" }</Link>
              <Link to={"/teams"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "TEAM" : "टीम" }</Link>
            </div>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden text-sm font-semibold">
            {lang === "en" ? "H.M.F." : "एच.एम.एफ."}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <Topbar />
      <MainNav />
    </>
  );
};

export default Navbar;
