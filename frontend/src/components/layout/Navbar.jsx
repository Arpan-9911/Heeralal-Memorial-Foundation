import React, { useState } from "react";
import Logo from "../../assets/logo2.jpeg";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { useSocialLinks, SocialIconsBar } from "../common/FloatingSocials";
import { getSettings } from "../../api";

const Topbar = () => {
  const { lang, changeLanguage } = useLanguage();
  const socialLinks = useSocialLinks();
  const [settings, setSettings] = useState(null);

  React.useEffect(() => {
    getSettings().then((res) => {
      if (res.settings && res.settings.registration) {
        setSettings(res.settings);
      }
    }).catch(console.error);
  }, []);

  const getRegValue = (key) => {
    if (!settings || !settings.registration) return "...";
    const item = settings.registration.find((i) => i.key === key);
    return item ? item.value : "...";
  };

  const getGeneralValue = (key) => {
    if (!settings || !settings.general) return "...";
    const item = settings.general.find((i) => i.key === key);
    return item ? item.value : "...";
  };


  return (
    <div>
      <div className="bg-[var(--color-secondary)]">
        <div className="max-w-6xl mx-auto text-white text-xs px-4 py-1 flex justify-between items-center max-md:hidden">
          <div>
            <span className="font-semibold text-[var(--color-primary)]">
              {lang === "en" ? "LATEST:" : "अधिसूचना:"}
            </span>{" "}
            {lang === "en"
              ? getGeneralValue("latestNewsEn") !== "..." ? getGeneralValue("latestNewsEn") : "Heeralal Memorial Foundation expands education reach..."
              : getGeneralValue("latestNewsHi") !== "..." ? getGeneralValue("latestNewsHi") : "हीरलल मेमोरियल फाउंडेशन शिक्षा पहुंच को विकसित करता है..."}
          </div>
          <div>
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className={lang === "en" ? "text-[var(--color-primary)]" : "cursor-pointer hover:text-[var(--color-primary)] transition-colors"}
              >
                English
              </button>
              <span>|</span>
              <button
                onClick={() => changeLanguage("hi")}
                className={lang === "hi" ? "text-[var(--color-primary)]" : "cursor-pointer hover:text-[var(--color-primary)] transition-colors"}
              >
                हिंदी
              </button>
              <span>|</span>
              <a
                href="https://www.admin.hlmfofficial.org"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[var(--color-primary)] transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link to={"/"} className="flex items-center gap-4">
          <img src={Logo} alt="HLMF Logo" className="min-h-14 min-w-14 h-14 w-14 rounded-full object-cover" />
          <div>
            <h1 className="text-xl font-bold text-[var(--color-secondary)] tracking-wide">
              {lang === "en"
                ? "Heeralal Memorial Foundation"
                : "हीरालाल मेमोरियल फाउंडेशन"}
            </h1>
            <p className="text-xs text-[var(--color-primary-dark)] font-medium italic">
              {lang === "en"
                ? getGeneralValue("taglineEn") !== "..." ? getGeneralValue("taglineEn") : "Committed to Equality, Empowerment, and Sustainable Change"
                : getGeneralValue("taglineHi") !== "..." ? getGeneralValue("taglineHi") : "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये"}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-5 max-md:hidden">
          {/* Social Icons — to the left of NGO info */}
          <SocialIconsBar links={socialLinks} size={13} gap="5px" variant="header" />
          {/* NGO Registration Info */}
          <div 
            className="text-xs text-gray-600 text-right grid grid-cols-2 gap-x-4 gap-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div>Reg No: {getRegValue("ngoReg")}</div>
            <div>PAN: {getRegValue("pan")}</div>
            <div>CIN: {getRegValue("cin")}</div>
            <div>ESTD: {getRegValue("regDate")}</div>
            {getRegValue("section12A") && getRegValue("section12A") !== "..." && (
              <div>12A/12AB: {getRegValue("section12A")}</div>
            )}
            {getRegValue("section80G") && getRegValue("section80G") !== "..." && (
              <div>80G: {getRegValue("section80G")}</div>
            )}
            {getRegValue("darpanId") && getRegValue("darpanId") !== "..." && (
              <div>DARPAN: {getRegValue("darpanId")}</div>
            )}
          </div>
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
            
            {/* Left Links: Home, About, Achievements, Programs */}
            <div className="flex justify-end gap-10 text-xs font-medium flex-1">
              <Link to={"/"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "HOME" : "होम"}</Link>
              <Link to={"/about"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "ABOUT US" : "हमारे बारे में"}</Link>
              <Link to={"/achievements"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "ACHIEVEMENTS" : "उपलब्धियाँ" }</Link>
              <Link to={"/programs"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "PROGRAMS" : "प्रोग्राम" }</Link>
              <Link to={"/commendations"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "COMMENDATIONS" : "प्रशंसापत्र" }</Link>
            </div>

            {/* Center Diamond — 3D Golden Donate Button */}
            <Link
              to={"/donate"}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <div
                className="donate-diamond w-16 h-16 rotate-45 rounded flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #d4a017 0%, #f7e98e 25%, #c9952c 50%, #fffbe6 75%, #d4a017 100%)",
                  backgroundSize: "200% 200%",
                  animation: "goldenShimmer 3s ease-in-out infinite",
                  boxShadow: "0 4px 0 #8b6914, 0 6px 12px rgba(0,0,0,0.35), 0 0 20px rgba(212, 160, 23, 0.4), inset 0 1px 2px rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <span className="-rotate-45 text-[10px] font-bold text-center" style={{ color: "#4a120e", textShadow: "0 1px 1px rgba(255,255,255,0.3)" }}>
                  {lang === "en" ? "SUPPORT" : "समर्थन"}
                  <br />
                  {lang === "en" ? "& DONATE" : "एवं दान"}
                </span>
              </div>
            </Link>

            {/* Right Links: Media, Join Us, Team, Contact Us */}
            <div className="flex gap-10 text-xs font-medium flex-1">
              <Link to={"/media"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "MEDIA" : "मीडिया"}</Link>
              <Link to={"/join-us"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "JOIN US" : "जुड़ें"}</Link>

              <Link to={"/teams"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "TEAM" : "टीम" }</Link>
              <Link to={"/contact"} className="hover:text-[var(--color-primary)]">{lang === "en" ? "CONTACT US" : "संपर्क करें" }</Link>
            </div>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden text-sm font-semibold tracking-wider">
            {lang === "en" ? "H.L.M.F." : "एच.एल.एम.एफ."}
          </div>
        </div>
      </header>

      {/* Golden shimmer keyframe (shared with Home.jsx) */}
      <style>{`
        @keyframes goldenShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .donate-diamond:active {
          box-shadow: 0 2px 0 #8b6914, 0 3px 6px rgba(0,0,0,0.3), 0 0 12px rgba(212, 160, 23, 0.3), inset 0 1px 2px rgba(255,255,255,0.4) !important;
          transform: rotate(45deg) translateY(2px) !important;
        }
      `}</style>

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
