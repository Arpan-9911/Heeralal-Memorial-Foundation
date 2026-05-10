import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getSocialLinks,
  updateSocialLinks,
} from "../api/socialLinks.api";

const platforms = [
  {
    key: "facebook",
    label: "Facebook",
    icon: "📘",
    color: "#1877F2",
    placeholder: "https://facebook.com/yourpage",
  },
  {
    key: "twitter",
    label: "Twitter / X",
    icon: "🐦",
    color: "#1DA1F2",
    placeholder: "https://twitter.com/yourhandle",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: "📸",
    color: "#E4405F",
    placeholder: "https://instagram.com/yourpage",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "💼",
    color: "#0A66C2",
    placeholder: "https://linkedin.com/company/yourcompany",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: "▶️",
    color: "#FF0000",
    placeholder: "https://youtube.com/@yourchannel",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "💬",
    color: "#25D366",
    placeholder: "919876543210 (country code + number)",
  },
  {
    key: "phone",
    label: "Phone",
    icon: "📞",
    color: "#DC2626",
    placeholder: "+91 11-2345XXXX",
  },
];

const SocialLinks = () => {
  const [form, setForm] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    whatsapp: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await getSocialLinks();
      if (res.links) {
        setForm({
          facebook: res.links.facebook || "",
          twitter: res.links.twitter || "",
          instagram: res.links.instagram || "",
          linkedin: res.links.linkedin || "",
          youtube: res.links.youtube || "",
          whatsapp: res.links.whatsapp || "",
          phone: res.links.phone || "",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSocialLinks(form);
      toast.success("Social links updated!");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[var(--admin-muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Social Media Links</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Manage the floating social media icons shown on the website.
          Leave a field empty to hide that icon.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6 space-y-4">
        {platforms.map((p) => (
          <div key={p.key} className="flex items-center gap-4">
            {/* Color Dot + Icon */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: p.color }}
              ></span>
              <span className="text-lg">{p.icon}</span>
              <label className="text-sm font-semibold text-gray-700">
                {p.label}
              </label>
            </div>

            {/* Input */}
            <input
              value={form[p.key]}
              onChange={(e) =>
                setForm({ ...form, [p.key]: e.target.value })
              }
              placeholder={p.placeholder}
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)] text-sm"
            />

            {/* Status */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                form[p.key]
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {form[p.key] ? "Active" : "Hidden"}
            </span>
          </div>
        ))}
      </div>

      {/* INFO */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs text-blue-700">
          <strong>💡 Tip:</strong> Only platforms with a non-empty URL will appear as floating icons on the website.
          For WhatsApp, enter just the phone number with country code (e.g. 919876543210).
          For Phone, enter the full number (e.g. +91 11-2345XXXX).
        </p>
      </div>

      {/* SAVE */}
      <div className="flex gap-3">
        <button
          disabled={saving}
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-dark)] hover:text-white transition-all"
        >
          {saving ? "Saving..." : "Save Links"}
        </button>
        <button
          onClick={fetchLinks}
          className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;
