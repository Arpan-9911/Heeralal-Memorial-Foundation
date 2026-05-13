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

/**
 * Custom hook to fetch social links from the API.
 * Returns the links object (or null if not yet loaded).
 */
export const useSocialLinks = () => {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/social-links`)
      .then((res) => {
        if (res.data?.links) setLinks(res.data.links);
      })
      .catch(() => {});
  }, []);

  return links;
};

/**
 * Inline social-icon bar (non-floating).
 * Renders a horizontal row of social icons.
 *
 * @param {object}  links      – social links object from useSocialLinks()
 * @param {number}  [size=14]  – icon pixel size
 * @param {string}  [gap="6px"] – gap between icons
 * @param {string}  [variant="header"] – "header" (light bg) | "footer" (dark bg)
 */
export const SocialIconsBar = ({
  links,
  size = 14,
  gap = "6px",
  variant = "header",
}) => {
  if (!links) return null;

  const visibleIcons = iconConfig.filter((item) => links[item.key]);
  if (visibleIcons.length === 0) return null;

  return (
    <div
      className="social-icons-bar"
      style={{ display: "flex", alignItems: "center", gap, flexWrap: "wrap" }}
    >
      {visibleIcons.map((item) => {
        const Icon = item.icon;
        const rawValue = links[item.key];

        let href = rawValue;
        if (item.key === "whatsapp" && !rawValue.startsWith("http")) {
          href = `https://wa.me/${rawValue.replace(/[^0-9]/g, "")}`;
        } else if (item.key === "phone" && !rawValue.startsWith("tel:")) {
          href = `tel:${rawValue}`;
        }

        return (
          <a
            key={item.key}
            href={href}
            target={item.key === "phone" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className="social-icon-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: size + 14,
              height: size + 14,
              borderRadius: "50%",
              background: item.bg,
              color: "#fff",
              transition: "transform 0.2s, filter 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.18)";
              e.currentTarget.style.filter = "brightness(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
};

// Keep a default export for backward-compatibility (renders nothing now)
const FloatingSocials = () => null;
export default FloatingSocials;
