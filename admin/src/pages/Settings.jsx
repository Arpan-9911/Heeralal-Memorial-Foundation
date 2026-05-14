import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateCredentials } from "../api/auth.api";
import { getSettings, updateSettings } from "../api/settings.api";
import { FiEye, FiEyeOff, FiLock, FiUser, FiShield, FiSave } from "react-icons/fi";

const initialSettings = {
  general: [
    { key: "orgName", label: "Organisation Name", value: "Heeralal Memorial Foundation" },
    { key: "taglineEn", label: "Tagline (EN)", value: "Committed to Equality, Empowerment, and Sustainable Change" },
    { key: "taglineHi", label: "Tagline (HI)", value: "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये" },
    { key: "copyright", label: "Copyright Text", value: "© 2023-2024 Heeralal Memorial Foundation. All rights reserved." },
    { key: "managedBy", label: "Managed By", value: "Website Content Managed by SurPanix" },
  ],
  registration: [
    { key: "cin", label: "CIN", value: "U88900DL2023NPL416329" },
    { key: "regDate", label: "Registration Date", value: "June 29, 2023" },
    { key: "pan", label: "PAN", value: "AACH0000F" },
    { key: "rocNo", label: "ROC No.", value: "ITRA/DXM/S/ROC/..." },
    { key: "ngoReg", label: "NGO Reg No", value: "DL/2023/..." },
  ],
  contact: [
    { key: "email", label: "Email", value: "admin@hlmf.org.in" },
    { key: "phone", label: "Phone", value: "+91 11-2345XXXX" },
    { key: "addressEn", label: "Address 1 (EN)", value: "12/4B Institutional Area, New Delhi - 110001" },
    { key: "addressHi", label: "Address 1 (HI)", value: "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001" },
    { key: "officeEn", label: "Office 1 Label (EN)", value: "Central Delhi Office:" },
    { key: "officeHi", label: "Office 1 Label (HI)", value: "मध्य दिल्ली कार्यालय:" },
    { key: "address2En", label: "Address 2 (EN)", value: "" },
    { key: "address2Hi", label: "Address 2 (HI)", value: "" },
    { key: "office2En", label: "Office 2 Label (EN)", value: "" },
    { key: "office2Hi", label: "Office 2 Label (HI)", value: "" },
  ],
};

const sectionLabels = { general: "General", registration: "Institutional Identity", contact: "Contact Information" };

/* ─────────────────── Credentials Change Section ─────────────────── */

const CredentialsSection = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword) {
      return toast.error("Current password is required");
    }

    if (!form.newUsername && !form.newPassword) {
      return toast.error("Enter a new username or password to update");
    }

    if (form.newUsername && form.newUsername.trim().length < 3) {
      return toast.error("New username must be at least 3 characters");
    }

    if (form.newPassword) {
      if (form.newPassword.length < 6) {
        return toast.error("New password must be at least 6 characters");
      }
      if (form.newPassword !== form.confirmPassword) {
        return toast.error("New passwords do not match");
      }
    }

    try {
      setSaving(true);
      const res = await updateCredentials({
        currentPassword: form.currentPassword,
        newUsername: form.newUsername || undefined,
        newPassword: form.newPassword || undefined,
      });
      toast.success(res.message || "Credentials updated successfully");
      setForm({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update credentials");
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] bg-white";

  return (
    <div className="bg-white rounded-xl border border-[var(--admin-border)]">
      <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-center gap-2">
        <FiShield className="text-[var(--admin-accent)]" size={16} />
        <h3 className="text-sm font-bold">Account Credentials</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        {/* Current Password (required to authorize any change) */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--admin-muted)]">
            <FiLock size={12} />
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className={inp + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <div className="border-t border-dashed border-[var(--admin-border)]" />

        {/* New Username */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--admin-muted)]">
            <FiUser size={12} />
            New Username <span className="text-[10px] font-normal">(leave blank to keep current)</span>
          </label>
          <input
            type="text"
            name="newUsername"
            value={form.newUsername}
            onChange={handleChange}
            placeholder="Enter new username (min 3 characters)"
            className={inp}
          />
        </div>

        {/* New Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--admin-muted)]">
              <FiLock size={12} />
              New Password <span className="text-[10px] font-normal">(leave blank to keep current)</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className={inp + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--admin-muted)]">
              <FiLock size={12} />
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className={inp + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-[var(--admin-accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Credentials"}
          </button>
          <p className="text-[11px] text-[var(--admin-muted)] italic">
            You will need to re-login after changing your password.
          </p>
        </div>
      </form>
    </div>
  );
};

/* ────────────────────────── Main Settings Page ────────────────────────── */

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [editSection, setEditSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      if (res.settings) {
        // Merge fetched data with initial keys in case of missing keys
        const mergedSettings = { ...initialSettings };
        for (const key of ["general", "registration", "contact"]) {
          if (res.settings[key] && res.settings[key].length > 0) {
            mergedSettings[key] = mergedSettings[key].map(initialItem => {
              const fetchedItem = res.settings[key].find(i => i.key === initialItem.key);
              return fetchedItem ? { ...initialItem, value: fetchedItem.value } : initialItem;
            });
          }
        }
        setSettings(mergedSettings);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load settings from server");
    } finally {
      setLoading(false);
    }
  };

  const updateVal = (section, key, newVal) => {
    setSettings(prev => ({
      ...prev,
      [section]: prev[section].map(s => s.key === key ? { ...s, value: newVal } : s),
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await updateSettings(settings);
      toast.success("Settings saved successfully!");
      setEditSection(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  if (loading) {
    return <div className="text-[var(--admin-muted)]">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl pb-10">
      {/* Account Credentials Section */}
      <CredentialsSection />

      {/* Existing Settings Sections */}
      {Object.entries(settings).map(([section, fields]) => (
        <div key={section} className="bg-white rounded-xl border border-[var(--admin-border)]">
          <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-sm font-bold">{sectionLabels[section]}</h3>
            <button
              onClick={() => setEditSection(editSection === section ? null : section)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {editSection === section ? "Done" : "Edit"}
            </button>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {fields.map(field => (
              <div key={field.key} className="px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs font-semibold text-[var(--admin-muted)] sm:min-w-[160px]">{field.label}</span>
                {editSection === section ? (
                  <input
                    value={field.value}
                    onChange={e => updateVal(section, field.key, e.target.value)}
                    className={inp + " flex-1"}
                  />
                ) : (
                  <span className="text-sm text-gray-800 flex-1">{field.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Global Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[var(--admin-accent)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <FiSave size={16} />
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
