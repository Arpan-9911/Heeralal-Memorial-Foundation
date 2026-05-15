import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAboutUs, updateAboutUs } from "../api/aboutUs.api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const inputClass = "w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)] text-sm";
const labelClass = "text-sm font-medium block mb-1.5";
const sectionHeading = "font-bold mb-4 text-[var(--admin-maroon)]";

/* ─── Reusable bilingual input pair ─── */
const BiInput = ({ label, enVal, hiVal, onEnChange, onHiChange, textarea }) => {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className={labelClass}>{label} (English)</label>
        <Tag rows={textarea ? 3 : undefined} value={enVal} onChange={(e) => onEnChange(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{label} (Hindi)</label>
        <Tag rows={textarea ? 3 : undefined} value={hiVal} onChange={(e) => onHiChange(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
};

/* ═══════════════ TAB 1: LEGACY ═══════════════ */
const LegacyTab = ({ data, setData, legacyFiles, setLegacyFiles }) => {
  const addParagraph = () => setData({ ...data, paragraphs: [...data.paragraphs, { en: "", hi: "" }] });
  const removeParagraph = (i) => setData({ ...data, paragraphs: data.paragraphs.filter((_, idx) => idx !== i) });
  const updatePara = (i, lang, val) => {
    const p = [...data.paragraphs];
    p[i] = { ...p[i], [lang]: val };
    setData({ ...data, paragraphs: p });
  };
  const removeExistingImage = (img) => setData({ ...data, images: data.images.filter((x) => x !== img), removedImages: [...(data.removedImages || []), img] });

  return (
    <div className="space-y-6">
      <h2 className={sectionHeading}>🏛️ Institutional Legacy</h2>
      <BiInput label="Section Title" enVal={data.titleEn} hiVal={data.titleHi} onEnChange={(v) => setData({ ...data, titleEn: v })} onHiChange={(v) => setData({ ...data, titleHi: v })} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Paragraphs</label>
          <button type="button" onClick={addParagraph} className="text-xs px-3 py-1 bg-[var(--admin-accent)] rounded-lg font-semibold">+ Add Paragraph</button>
        </div>
        {data.paragraphs.map((p, i) => (
          <div key={i} className="mb-4 p-4 border border-[var(--admin-border)] rounded-xl relative">
            <button type="button" onClick={() => removeParagraph(i)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">✕</button>
            <p className="text-xs text-[var(--admin-muted)] mb-2">Paragraph {i + 1}</p>
            <div className="space-y-2">
              <textarea rows={2} value={p.en} onChange={(e) => updatePara(i, "en", e.target.value)} className={inputClass} placeholder="English" />
              <textarea rows={2} value={p.hi} onChange={(e) => updatePara(i, "hi", e.target.value)} className={inputClass} placeholder="Hindi" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass}>Legacy Images</label>
        {data.images?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {data.images.map((img, i) => (
              <div key={i} className="relative group">
                <img src={`${BACKEND}/uploads/about/${img}`} alt="" className="w-32 h-24 object-cover rounded-lg border border-[var(--admin-border)]" />
                <button type="button" onClick={() => removeExistingImage(img)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
              </div>
            ))}
          </div>
        )}
        <input type="file" accept="image/*" multiple onChange={(e) => setLegacyFiles(Array.from(e.target.files))} className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 text-sm" />
        <p className="text-xs text-[var(--admin-muted)] mt-1">Upload new images (max 5)</p>
      </div>
    </div>
  );
};

/* ═══════════════ TAB 2: VISION & MISSION ═══════════════ */
const VisionTab = ({ data, setData, visionFile, setVisionFile }) => {
  const set = (key, val) => setData({ ...data, [key]: val });
  return (
    <div className="space-y-6">
      <h2 className={sectionHeading}>🔭 Vision & Mission</h2>
      <BiInput label="Section Subtitle" enVal={data.subtitleEn} hiVal={data.subtitleHi} onEnChange={(v) => set("subtitleEn", v)} onHiChange={(v) => set("subtitleHi", v)} />
      <BiInput label="Section Title" enVal={data.titleEn} hiVal={data.titleHi} onEnChange={(v) => set("titleEn", v)} onHiChange={(v) => set("titleHi", v)} />
      <BiInput label="Vision Quote" enVal={data.quoteEn} hiVal={data.quoteHi} onEnChange={(v) => set("quoteEn", v)} onHiChange={(v) => set("quoteHi", v)} textarea />
      <hr className="border-[var(--admin-border)]" />
      <BiInput label="Mission Title" enVal={data.missionTitleEn} hiVal={data.missionTitleHi} onEnChange={(v) => set("missionTitleEn", v)} onHiChange={(v) => set("missionTitleHi", v)} />
      <BiInput label="Mission Description" enVal={data.missionDescEn} hiVal={data.missionDescHi} onEnChange={(v) => set("missionDescEn", v)} onHiChange={(v) => set("missionDescHi", v)} textarea />
      <hr className="border-[var(--admin-border)]" />
      <BiInput label="Objective Title" enVal={data.objectiveTitleEn} hiVal={data.objectiveTitleHi} onEnChange={(v) => set("objectiveTitleEn", v)} onHiChange={(v) => set("objectiveTitleHi", v)} />
      <BiInput label="Objective Description" enVal={data.objectiveDescEn} hiVal={data.objectiveDescHi} onEnChange={(v) => set("objectiveDescEn", v)} onHiChange={(v) => set("objectiveDescHi", v)} textarea />
      <hr className="border-[var(--admin-border)]" />
      <div>
        <label className={labelClass}>Vision & Mission Full-Width Image</label>
        {data.image && !visionFile && (
          <div className="mb-3">
            <img src={`${BACKEND}/uploads/about/${data.image}`} alt="Vision" className="w-64 h-auto object-cover rounded-lg border border-[var(--admin-border)]" />
          </div>
        )}
        <input type="file" accept="image/*" onChange={(e) => setVisionFile(e.target.files[0])} className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 text-sm" />
        <p className="text-xs text-[var(--admin-muted)] mt-1">Upload an image to show beneath the vision messages</p>
      </div>
    </div>
  );
};

/* ═══════════════ TAB 3: CORE VALUES ═══════════════ */
const ValuesTab = ({ data, setData }) => {
  const add = () => setData([...data, { icon: "🏛️", title: { en: "", hi: "" }, desc: { en: "", hi: "" } }]);
  const remove = (i) => setData(data.filter((_, idx) => idx !== i));
  const update = (i, field, lang, val) => {
    const copy = [...data];
    if (field === "icon") copy[i].icon = val;
    else copy[i][field] = { ...copy[i][field], [lang]: val };
    setData(copy);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={sectionHeading}>✊ Core Values</h2>
        <button type="button" onClick={add} className="text-xs px-3 py-1 bg-[var(--admin-accent)] rounded-lg font-semibold">+ Add Value</button>
      </div>
      {data.map((v, i) => (
        <div key={i} className="p-4 border border-[var(--admin-border)] rounded-xl relative space-y-3">
          <button type="button" onClick={() => remove(i)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">✕</button>
          <div className="flex gap-4 items-end">
            <div className="w-20">
              <label className={labelClass}>Icon</label>
              <input value={v.icon} onChange={(e) => update(i, "icon", null, e.target.value)} className={inputClass} />
            </div>
            <div className="flex-1"><label className={labelClass}>Title (EN)</label><input value={v.title.en} onChange={(e) => update(i, "title", "en", e.target.value)} className={inputClass} /></div>
            <div className="flex-1"><label className={labelClass}>Title (HI)</label><input value={v.title.hi} onChange={(e) => update(i, "title", "hi", e.target.value)} className={inputClass} /></div>
          </div>
          <BiInput label="Description" enVal={v.desc.en} hiVal={v.desc.hi} onEnChange={(val) => update(i, "desc", "en", val)} onHiChange={(val) => update(i, "desc", "hi", val)} textarea />
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ TAB 4: GOVERNANCE ═══════════════ */
const GovernanceTab = ({ data, setData }) => {
  const set = (key, val) => setData({ ...data, [key]: val });
  const addRow = () => setData({ ...data, rows: [...data.rows, { body: { en: "", hi: "" }, frequency: { en: "", hi: "" }, responsibility: { en: "", hi: "" } }] });
  const removeRow = (i) => setData({ ...data, rows: data.rows.filter((_, idx) => idx !== i) });
  const updateRow = (i, field, lang, val) => {
    const r = [...data.rows];
    r[i][field] = { ...r[i][field], [lang]: val };
    setData({ ...data, rows: r });
  };

  return (
    <div className="space-y-6">
      <h2 className={sectionHeading}>🏢 Governance</h2>
      <BiInput label="Section Title" enVal={data.titleEn} hiVal={data.titleHi} onEnChange={(v) => set("titleEn", v)} onHiChange={(v) => set("titleHi", v)} />
      <BiInput label="Description" enVal={data.descEn} hiVal={data.descHi} onEnChange={(v) => set("descEn", v)} onHiChange={(v) => set("descHi", v)} textarea />
      <div className="flex items-center justify-between">
        <label className={labelClass}>Governance Table Rows</label>
        <button type="button" onClick={addRow} className="text-xs px-3 py-1 bg-[var(--admin-accent)] rounded-lg font-semibold">+ Add Row</button>
      </div>
      {data.rows.map((row, i) => (
        <div key={i} className="p-4 border border-[var(--admin-border)] rounded-xl relative space-y-3">
          <button type="button" onClick={() => removeRow(i)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">✕</button>
          <p className="text-xs text-[var(--admin-muted)]">Row {i + 1}</p>
          <BiInput label="Body Name" enVal={row.body.en} hiVal={row.body.hi} onEnChange={(v) => updateRow(i, "body", "en", v)} onHiChange={(v) => updateRow(i, "body", "hi", v)} />
          <BiInput label="Frequency" enVal={row.frequency.en} hiVal={row.frequency.hi} onEnChange={(v) => updateRow(i, "frequency", "en", v)} onHiChange={(v) => updateRow(i, "frequency", "hi", v)} />
          <BiInput label="Responsibility" enVal={row.responsibility.en} hiVal={row.responsibility.hi} onEnChange={(v) => updateRow(i, "responsibility", "en", v)} onHiChange={(v) => updateRow(i, "responsibility", "hi", v)} />
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ TAB 5: COMPLIANCE ═══════════════ */
const ComplianceTab = ({ data, setData }) => {
  const set = (key, val) => setData({ ...data, [key]: val });

  const addItem = () => setData({ ...data, items: [...data.items, { en: "", hi: "" }] });
  const removeItem = (i) => setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  const updateItem = (i, lang, val) => { const c = [...data.items]; c[i] = { ...c[i], [lang]: val }; setData({ ...data, items: c }); };

  const addCard = () => setData({ ...data, cards: [...data.cards, { title: { en: "", hi: "" }, desc: { en: "", hi: "" } }] });
  const removeCard = (i) => setData({ ...data, cards: data.cards.filter((_, idx) => idx !== i) });
  const updateCard = (i, field, lang, val) => { const c = [...data.cards]; c[i][field] = { ...c[i][field], [lang]: val }; setData({ ...data, cards: c }); };

  return (
    <div className="space-y-6">
      <h2 className={sectionHeading}>📋 Compliance & Audit</h2>
      <BiInput label="Section Title" enVal={data.titleEn} hiVal={data.titleHi} onEnChange={(v) => set("titleEn", v)} onHiChange={(v) => set("titleHi", v)} />
      <BiInput label="Description" enVal={data.descEn} hiVal={data.descHi} onEnChange={(v) => set("descEn", v)} onHiChange={(v) => set("descHi", v)} textarea />

      <hr className="border-[var(--admin-border)]" />
      <div className="flex items-center justify-between">
        <label className={labelClass}>Compliance Items (Badges)</label>
        <button type="button" onClick={addItem} className="text-xs px-3 py-1 bg-[var(--admin-accent)] rounded-lg font-semibold">+ Add Item</button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="flex gap-3 items-end">
          <div className="flex-1"><input value={item.en} onChange={(e) => updateItem(i, "en", e.target.value)} className={inputClass} placeholder="English" /></div>
          <div className="flex-1"><input value={item.hi} onChange={(e) => updateItem(i, "hi", e.target.value)} className={inputClass} placeholder="Hindi" /></div>
          <button type="button" onClick={() => removeItem(i)} className="text-red-500 text-xs font-bold pb-3">✕</button>
        </div>
      ))}

      <hr className="border-[var(--admin-border)]" />
      <div className="flex items-center justify-between">
        <label className={labelClass}>Info Cards (Transparency, Ethics, etc.)</label>
        <button type="button" onClick={addCard} className="text-xs px-3 py-1 bg-[var(--admin-accent)] rounded-lg font-semibold">+ Add Card</button>
      </div>
      {data.cards.map((card, i) => (
        <div key={i} className="p-4 border border-[var(--admin-border)] rounded-xl relative space-y-3">
          <button type="button" onClick={() => removeCard(i)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">✕</button>
          <BiInput label="Card Title" enVal={card.title.en} hiVal={card.title.hi} onEnChange={(v) => updateCard(i, "title", "en", v)} onHiChange={(v) => updateCard(i, "title", "hi", v)} />
          <BiInput label="Card Description" enVal={card.desc.en} hiVal={card.desc.hi} onEnChange={(v) => updateCard(i, "desc", "en", v)} onHiChange={(v) => updateCard(i, "desc", "hi", v)} textarea />
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

const tabList = [
  { id: "legacy", label: "Legacy", icon: "🏛️" },
  { id: "vision", label: "Vision & Mission", icon: "🔭" },
  { id: "values", label: "Core Values", icon: "✊" },
  { id: "governance", label: "Governance", icon: "🏢" },
  { id: "compliance", label: "Compliance", icon: "📋" },
];

const AboutUsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("legacy");

  // State per tab
  const [legacy, setLegacy] = useState({ titleEn: "", titleHi: "", paragraphs: [], images: [], removedImages: [] });
  const [legacyFiles, setLegacyFiles] = useState([]);
  const [vision, setVision] = useState({ subtitleEn: "", subtitleHi: "", titleEn: "", titleHi: "", quoteEn: "", quoteHi: "", missionTitleEn: "", missionTitleHi: "", missionDescEn: "", missionDescHi: "", objectiveTitleEn: "", objectiveTitleHi: "", objectiveDescEn: "", objectiveDescHi: "", image: "" });
  const [visionFile, setVisionFile] = useState(null);
  const [values, setValues] = useState([]);
  const [governance, setGovernance] = useState({ titleEn: "", titleHi: "", descEn: "", descHi: "", rows: [] });
  const [compliance, setCompliance] = useState({ titleEn: "", titleHi: "", descEn: "", descHi: "", items: [], cards: [] });

  /* ─── FETCH ─── */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAboutUs();
      const d = res.aboutUs;
      if (!d) return;

      setLegacy({
        titleEn: d.legacy?.title?.en || "",
        titleHi: d.legacy?.title?.hi || "",
        paragraphs: d.legacy?.paragraphs || [],
        images: d.legacy?.images || [],
        removedImages: [],
      });

      const v = d.vision || {};
      setVision({
        subtitleEn: v.subtitle?.en || "", subtitleHi: v.subtitle?.hi || "",
        titleEn: v.title?.en || "", titleHi: v.title?.hi || "",
        quoteEn: v.quote?.en || "", quoteHi: v.quote?.hi || "",
        missionTitleEn: v.missionTitle?.en || "", missionTitleHi: v.missionTitle?.hi || "",
        missionDescEn: v.missionDesc?.en || "", missionDescHi: v.missionDesc?.hi || "",
        objectiveTitleEn: v.objectiveTitle?.en || "", objectiveTitleHi: v.objectiveTitle?.hi || "",
        objectiveDescEn: v.objectiveDesc?.en || "", objectiveDescHi: v.objectiveDesc?.hi || "",
        image: v.image || "",
      });

      setValues(d.coreValues || []);

      const g = d.governance || {};
      setGovernance({
        titleEn: g.title?.en || "", titleHi: g.title?.hi || "",
        descEn: g.description?.en || "", descHi: g.description?.hi || "",
        rows: g.rows || [],
      });

      const c = d.compliance || {};
      setCompliance({
        titleEn: c.title?.en || "", titleHi: c.title?.hi || "",
        descEn: c.description?.en || "", descHi: c.description?.hi || "",
        items: c.items || [],
        cards: c.cards || [],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /* ─── SAVE ─── */
  const handleSave = async () => {
    try {
      setSaving(true);
      const fd = new FormData();

      // Legacy
      fd.append("legacyTitleEn", legacy.titleEn);
      fd.append("legacyTitleHi", legacy.titleHi);
      fd.append("legacyParagraphs", JSON.stringify(legacy.paragraphs));
      // Remove images one by one
      if (legacy.removedImages?.length) {
        legacy.removedImages.forEach((img) => fd.append("removeLegacyImage", img));
      }
      // New files
      if (legacyFiles.length) {
        legacyFiles.forEach((f) => fd.append("legacyImages", f));
      }

      // Vision
      Object.entries(vision).forEach(([k, v]) => {
        if (k === 'image') return;
        const fieldMap = {
          subtitleEn: "visionSubtitleEn", subtitleHi: "visionSubtitleHi",
          titleEn: "visionTitleEn", titleHi: "visionTitleHi",
          quoteEn: "visionQuoteEn", quoteHi: "visionQuoteHi",
          missionTitleEn: "missionTitleEn", missionTitleHi: "missionTitleHi",
          missionDescEn: "missionDescEn", missionDescHi: "missionDescHi",
          objectiveTitleEn: "objectiveTitleEn", objectiveTitleHi: "objectiveTitleHi",
          objectiveDescEn: "objectiveDescEn", objectiveDescHi: "objectiveDescHi",
        };
        fd.append(fieldMap[k] || k, v);
      });
      if (visionFile) {
        fd.append("visionImage", visionFile);
      }

      // Core values
      fd.append("coreValues", JSON.stringify(values));

      // Governance
      fd.append("governanceTitleEn", governance.titleEn);
      fd.append("governanceTitleHi", governance.titleHi);
      fd.append("governanceDescEn", governance.descEn);
      fd.append("governanceDescHi", governance.descHi);
      fd.append("governanceRows", JSON.stringify(governance.rows));

      // Compliance
      fd.append("complianceTitleEn", compliance.titleEn);
      fd.append("complianceTitleHi", compliance.titleHi);
      fd.append("complianceDescEn", compliance.descEn);
      fd.append("complianceDescHi", compliance.descHi);
      fd.append("complianceItems", JSON.stringify(compliance.items));
      fd.append("complianceCards", JSON.stringify(compliance.cards));

      await updateAboutUs(fd);
      toast.success("About Us page updated!");
      setLegacyFiles([]);
      setVisionFile(null);
      await fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update About Us page");
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
        <h1 className="text-xl font-bold">About Us Page</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Manage all sections of the About Us page — content, images, and structured data
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex flex-wrap gap-1 border-b border-[var(--admin-border)] pb-0">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white border border-[var(--admin-border)] border-b-white -mb-px text-[var(--admin-maroon)]"
                : "text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-gray-50"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6">
        {activeTab === "legacy" && <LegacyTab data={legacy} setData={setLegacy} legacyFiles={legacyFiles} setLegacyFiles={setLegacyFiles} />}
        {activeTab === "vision" && <VisionTab data={vision} setData={setVision} visionFile={visionFile} setVisionFile={setVisionFile} />}
        {activeTab === "values" && <ValuesTab data={values} setData={setValues} />}
        {activeTab === "governance" && <GovernanceTab data={governance} setData={setGovernance} />}
        {activeTab === "compliance" && <ComplianceTab data={compliance} setData={setCompliance} />}

        <hr className="border-[var(--admin-border)] mt-6" />

        {/* SAVE BUTTON */}
        <div className="flex gap-3 mt-6">
          <button
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-dark)] hover:text-white transition-all"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
          <button onClick={fetchData} className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsAdmin;
