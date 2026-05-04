import React, { useState } from "react";

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
    { key: "addressEn", label: "Address (EN)", value: "12/4B Institutional Area, New Delhi - 110001" },
    { key: "addressHi", label: "Address (HI)", value: "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001" },
    { key: "officeEn", label: "Office Label (EN)", value: "Central Delhi Office:" },
    { key: "officeHi", label: "Office Label (HI)", value: "मध्य दिल्ली कार्यालय:" },
  ],
};

const sectionLabels = { general: "General", registration: "Institutional Identity", contact: "Contact Information" };

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [editSection, setEditSection] = useState(null);

  const updateVal = (section, key, newVal) => {
    setSettings(prev => ({
      ...prev,
      [section]: prev[section].map(s => s.key === key ? { ...s, value: newVal } : s),
    }));
  };

  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-6 max-w-3xl">
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
      <p className="text-[11px] text-[var(--admin-muted)] italic">
        Changes will take effect after backend integration is completed.
      </p>
    </div>
  );
};

export default Settings;
