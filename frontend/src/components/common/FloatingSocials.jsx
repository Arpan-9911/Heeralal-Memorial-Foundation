import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const iconConfig = [
  {
    key: "facebook",
    icon: FaFacebookF,
    bg: "#1877F2",
    label: "Facebook",
    prefix: "",
  },
  {
    key: "twitter",
    icon: FaTwitter,
    bg: "#1DA1F2",
    label: "Twitter",
    prefix: "",
  },
  {
    key: "instagram",
    icon: FaInstagram,
    bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    label: "Instagram",
    prefix: "",
  },
  {
    key: "linkedin",
    icon: FaLinkedinIn,
    bg: "#0A66C2",
    label: "LinkedIn",
    prefix: "",
  },
  {
    key: "youtube",
    icon: FaYoutube,
    bg: "#FF0000",
    label: "YouTube",
    prefix: "",
  },
  {
    key: "whatsapp",
    icon: FaWhatsapp,
    bg: "#25D366",
    label: "WhatsApp",
    prefix: "https://wa.me/",
  },
  {
    key: "phone",
    icon: FaPhoneAlt,
    bg: "#DC2626",
    label: "Phone",
    prefix: "tel:",
  },
];

const FloatingSocials = () => {
  const [links, setLinks] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/social-links`)
      .then((res) => {
        if (res.data?.links) setLinks(res.data.links);
      })
      .catch(() => {});

    // Show after a small delay for entrance animation
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  const visibleIcons = iconConfig.filter(
    (item) => links && links[item.key]
  );

  if (!links || visibleIcons.length === 0) return null;

  return (
    <>
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col"
        style={{
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: show
            ? "translateX(0) translateY(-50%)"
            : "translateX(100%) translateY(-50%)",
        }}
      >
        {visibleIcons.map((item, i) => {
          const Icon = item.icon;
          const rawValue = links[item.key];

          // Build the href
          let href = rawValue;
          if (item.key === "whatsapp" && !rawValue.startsWith("http")) {
            href = `https://wa.me/${rawValue.replace(/[^0-9]/g, "")}`;
          } else if (item.key === "phone" && !rawValue.startsWith("tel:")) {
            href = `tel:${rawValue}`;
          }

          const isGradient = item.bg.includes("gradient");

          return (
            <a
              key={item.key}
              href={href}
              target={item.key === "phone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group relative flex items-center justify-center w-10 h-10 text-white transition-all duration-300 hover:w-12 hover:shadow-lg"
              style={{
                background: item.bg,
                transitionDelay: `${i * 40}ms`,
                borderRadius: "6px 0 0 6px",
              }}
              title={item.label}
            >
              <Icon size={18} />

              {/* Tooltip */}
              <span
                className="absolute right-full mr-2 px-2 py-1 text-[10px] font-bold text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: isGradient ? "#cc2366" : item.bg,
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      <style>{`
        .fixed a:hover {
          filter: brightness(1.15);
        }
      `}</style>
    </>
  );
};

export default FloatingSocials;
