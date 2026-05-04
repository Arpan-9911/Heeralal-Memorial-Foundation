import React, { useState } from "react";

const mockStats = [
  { id: 1, icon: "🎓", value: "15,000+", labelEn: "Students Empowered", labelHi: "छात्र सशक्त" },
  { id: 2, icon: "🏡", value: "25+", labelEn: "Rural Villages Reached", labelHi: "ग्रामीण गांव पहुंचे" },
  { id: 3, icon: "🏥", value: "5,000+", labelEn: "Medical Consultations", labelHi: "चिकित्सा परामर्श" },
  { id: 4, icon: "🤝", value: "12+", labelEn: "MoU Partners", labelHi: "एमओयू साझेदार" },
];

const Stats = () => {
  const [stats, setStats] = useState(mockStats);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const empty = { icon: "📊", value: "", labelEn: "", labelHi: "" };
  const [form, setForm] = useState(empty);

  const reset = () => { setForm(empty); setEditing(null); setShowForm(false); };
  const save = () => { if (editing) setStats(p => p.map(i => i.id === editing ? { ...form, id: editing } : i)); else setStats(p => [...p, { ...form, id: Date.now() }]); reset(); };
  const del = (id) => setStats(p => p.filter(i => i.id !== id));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">These stats appear on both Home and Achievements pages.</p>
        <button onClick={() => { reset(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Stat</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Stat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Icon (emoji)</label><input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className={inp} /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Value</label><input value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="15,000+" className={inp} /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Label (EN)</label><input value={form.labelEn} onChange={e => setForm({ ...form, labelEn: e.target.value })} className={inp} /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Label (HI)</label><input value={form.labelHi} onChange={e => setForm({ ...form, labelHi: e.target.value })} className={inp} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">{editing ? "Update" : "Add"}</button>
            <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-[var(--admin-border)] p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">{s.icon}</div>
            <h3 className="text-2xl font-bold">{s.value}</h3>
            <p className="text-xs text-[var(--admin-muted)] font-semibold mt-1">{s.labelEn}</p>
            <p className="text-[11px] text-[var(--admin-muted)]">{s.labelHi}</p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <button onClick={() => { setForm(s); setEditing(s.id); setShowForm(true); }} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
              <button onClick={() => del(s.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
