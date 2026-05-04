import React, { useState } from "react";

const mock = [
  { id: 1, image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=400", titleEn: "Certificate of Excellence in Rural Education", titleHi: "ग्रामीण शिक्षा में उत्कृष्टता प्रमाणपत्र", descEn: "Awarded for Vidya Jyoti initiative bridging the digital divide.", descHi: "विद्या ज्योति पहल के लिए सम्मानित।", presentedByEn: "National Education Council (2024)", presentedByHi: "राष्ट्रीय शिक्षा परिषद (2024)" },
  { id: 2, image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=400", titleEn: "Community Health Impact Pioneer", titleHi: "सामुदायिक स्वास्थ्य प्रभाव अग्रणी", descEn: "Recognition for Swasthya Seva mobile clinic model.", descHi: "स्वास्थ्य सेवा मोबाइल क्लिनिक के लिए मान्यता।", presentedByEn: "Delhi Health & Welfare Board", presentedByHi: "दिल्ली स्वास्थ्य एवं कल्याण बोर्ड" },
];

const Achievements = () => {
  const [items, setItems] = useState(mock);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const empty = { image: "", titleEn: "", titleHi: "", descEn: "", descHi: "", presentedByEn: "", presentedByHi: "" };
  const [form, setForm] = useState(empty);

  const reset = () => { setForm(empty); setEditing(null); setShowForm(false); };
  const save = () => { if (editing) setItems(p => p.map(i => i.id === editing ? { ...form, id: editing } : i)); else setItems(p => [...p, { ...form, id: Date.now() }]); reset(); };
  const del = (id) => setItems(p => p.filter(i => i.id !== id));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">{items.length} achievement{items.length !== 1 && "s"}</p>
        <button onClick={() => { reset(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Achievement</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Achievement</h3>
          <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inp} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[["titleEn","Title (EN)"],["titleHi","Title (HI)"],["presentedByEn","Presented By (EN)"],["presentedByHi","Presented By (HI)"]].map(([k,l])=>(
              <div key={k} className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">{l}</label><input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className={inp}/></div>
            ))}
            {[["descEn","Description (EN)"],["descHi","Description (HI)"]].map(([k,l])=>(
              <div key={k} className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">{l}</label><textarea value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} rows={2} className={inp+" resize-none"}/></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">{editing?"Update":"Add"}</button>
            <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {items.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-56 h-40 md:h-auto flex-shrink-0">
              <img src={a.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-5">
              <h3 className="text-sm font-bold">{a.titleEn}</h3>
              <p className="text-xs text-[var(--admin-muted)]">{a.titleHi}</p>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{a.descEn}</p>
              <p className="text-xs text-[var(--admin-maroon)] font-medium mt-2">{a.presentedByEn}</p>
              <div className="flex gap-1.5 mt-3">
                <button onClick={() => { setForm(a); setEditing(a.id); setShowForm(true); }} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={() => del(a.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
