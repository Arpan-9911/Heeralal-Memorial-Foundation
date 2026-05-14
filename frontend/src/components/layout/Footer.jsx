import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { useSocialLinks, SocialIconsBar } from "../common/FloatingSocials";
import { getSettings } from "../../api";

const footerData = {
  foundation: {
    name: {
      en: "Heeralal Memorial Foundation",
      hi: "हीरालाल मेमोरियल फाउंडेशन",
    },
    description: {
      en: "Registered under the Indian Companies Act. Committed to socio-economic upliftment and sustainable environmental changes through institutionalized efforts.",
      hi: "भारतीय कंपनी अधिनियम के तहत पंजीकृत। संस्थागत प्रयासों के माध्यम से सामाजिक-आर्थिक उत्थान और सतत पर्यावरणीय परिवर्तन के लिए प्रतिबद्ध।",
    },
  },
  quickLinks: {
    title: {
      en: "Quick Links",
      hi: "त्वरित लिंक",
    },
    links: [
      {
        label: { en: "Contact Us", hi: "संपर्क करें" },
        href: "/contact",
      },
      {
        label: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
        href: "/privacy-policy",
      },
      {
        label: { en: "Website Policies", hi: "वेबसाइट नीतियाँ" },
        href: "/website-policies",
      },
      {
        label: { en: "Terms & Conditions", hi: "नियम एवं शर्तें" },
        href: "/terms",
      },
      {
        label: { en: "Help", hi: "सहायता" },
        href: "/help",
      },
    ],
  },
  contactRegistry: {
    title: {
      en: "Contact Registry",
      hi: "संपर्क रजिस्ट्री",
    },
    office: {
      en: "Central Delhi Office:",
      hi: "मध्य दिल्ली कार्यालय:",
    },
    address: {
      en: "12/4B Institutional Area, New Delhi - 110001",
      hi: "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001",
    },
    email: "admin@hlmf.org.in",
    phone: "+91 11-2345XXXX",
  },
  identity: {
    title: {
      en: "Institutional Identity",
      hi: "संस्थागत पहचान",
    },
    items: [
      { label: "CIN", value: "U88900DL2023NPL416329" },
      { label: "REG DATE", value: "June 29, 2023" },
      { label: "PAN", value: "AACH0000F" },
      { label: "ROC NO", value: "ITRA/DXM/S/ROC/..." },
    ],
  },
  copyright: {
    en: "© 2023-2024 Heeralal Memorial Foundation. All rights reserved.",
    hi: "© 2023-2024 हीरालाल मेमोरियल फाउंडेशन। सर्वाधिकार सुरक्षित।",
  },
  managedBy: {
    en: "Website Content Managed by SurPanix",
    hi: "वेबसाइट सामग्री SurPanix द्वारा प्रबंधित।",
  },
};

const Footer = ({ topBg = "bg-[var(--color-secondary)]" }) => {
  const { lang } = useLanguage();
  const socialLinks = useSocialLinks();
  const [settings, setSettings] = React.useState(null);

  React.useEffect(() => {
    getSettings().then((res) => {
      if (res.settings) setSettings(res.settings);
    }).catch(console.error);
  }, []);

  const getContactVal = (key) => {
    if (!settings || !settings.contact) return null;
    const item = settings.contact.find(i => i.key === key);
    return item ? item.value : null;
  };

  return (
    <footer id="site-footer">
      {/* Straight Top Border */}
      <div className="h-1 bg-[var(--color-primary)]"></div>

      {/* Main Footer Content */}
      <div className="bg-[var(--color-secondary-dark)] text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1: Foundation Info */}
            <div>
              <h3
                className="text-[var(--color-primary)] font-bold text-lg italic mb-4"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {footerData.foundation.name[lang]}
              </h3>
              <p className="text-xs leading-relaxed text-gray-400">
                {footerData.foundation.description[lang]}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-4">
                {footerData.quickLinks.title[lang]}
              </h4>
              <ul className="space-y-2">
                {footerData.quickLinks.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-xs text-gray-400 hover:text-[var(--color-primary)] transition-colors duration-200"
                    >
                      {link.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Registry */}
            <div>
              <h4 className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-4">
                {footerData.contactRegistry.title[lang]}
              </h4>
              <div className="space-y-2 text-xs text-gray-400">
                <p className="font-semibold text-gray-300">
                  {getContactVal(lang === "en" ? "officeEn" : "officeHi") || footerData.contactRegistry.office[lang]}
                </p>
                <p>{getContactVal(lang === "en" ? "addressEn" : "addressHi") || footerData.contactRegistry.address[lang]}</p>
                
                {getContactVal(lang === "en" ? "address2En" : "address2Hi") && (
                  <div className="pt-2">
                    <p className="font-semibold text-gray-300">
                      {getContactVal(lang === "en" ? "office2En" : "office2Hi")}
                    </p>
                    <p>{getContactVal(lang === "en" ? "address2En" : "address2Hi")}</p>
                  </div>
                )}
                
                <p className="pt-2">
                  {lang === "en" ? "Email: " : "ईमेल: "}
                  <a
                    href={`mailto:${getContactVal("email") || footerData.contactRegistry.email}`}
                    className="hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {getContactVal("email") || footerData.contactRegistry.email}
                  </a>
                </p>
                <p>
                  {lang === "en" ? "Phone: " : "फ़ोन: "}
                  <a
                    href={`tel:${getContactVal("phone") || footerData.contactRegistry.phone}`}
                    className="hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    {getContactVal("phone") || footerData.contactRegistry.phone}
                  </a>
                </p>
              </div>
              {/* Social Icons beneath Contact Registry */}
              <div className="mt-4">
                <SocialIconsBar links={socialLinks} size={13} gap="6px" variant="footer" />
              </div>
            </div>

            {/* Column 4: Institutional Identity */}
            <div>
              <h4 className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest mb-4">
                {footerData.identity.title[lang]}
              </h4>
              <div className="border border-[var(--color-secondary-light)] rounded overflow-hidden">
                {footerData.identity.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex text-[11px] px-3 py-[6px] ${
                      i % 2 === 0
                        ? "bg-[var(--color-secondary)]"
                        : "bg-[var(--color-secondary-dark)]"
                    }`}
                  >
                    <span className="text-[var(--color-primary)] font-semibold min-w-[70px]">
                      {item.label}:
                    </span>
                    <span className="text-gray-300 ml-1">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-secondary)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-gray-500">
              {footerData.copyright[lang]}
            </p>
            <p className="text-[11px] text-gray-500 italic">
              {footerData.managedBy[lang]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;