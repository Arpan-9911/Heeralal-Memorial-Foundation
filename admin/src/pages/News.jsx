import React, { useState } from "react";

const mock = [
  { id: 1, tag: "Press Release", date: "2024-11-26", titleEn: "HLMF Inaugurates New Digital Learning Center", titleHi: "डिजिटल लर्निंग सेंटर का उद्घाटन", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400" },
  { id: 2, tag: "Event", date: "2024-11-18", titleEn: "500+ Trees Planted in Reforestation Drive", titleHi: "वृक्षारोपण अभियान में 500+ पेड़ लगाए", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" },
];

const News = () => {
  const [items, setItems] = useState(mock);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const empty = { tag: "Press Release", date: "", titleEn: "", titleHi: "", image: "" };
  const [form, setForm] = useState(empty);

  const reset = () => { setForm(empty); setEditing(null); setShowForm(false); };
  const save = () => { if (editing) setItems(p => p.map(i => i.id === editing ? { ...form, id: editing } : i)); else setItems(p => [...p, { ...form, id: Date.now() }]); reset(); };
  const del = (id) => setItems(p => p.filter(i => i.id !== id));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">{items.length} post{items.length !== 1 && "s"}</p>
        <button onClick={() => { reset(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Post</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Post</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Tag</label>
              <select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} className={inp}>
                <option>Press Release</option><option>Event</option><option>Update</option>
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inp} /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inp} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Title (EN)</label><input value={form.titleEn} onChange={e => setForm({ ...form, titleEn: e.target.value })} className={inp} /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Title (HI)</label><input value={form.titleHi} onChange={e => setForm({ ...form, titleHi: e.target.value })} className={inp} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">{editing ? "Update" : "Add"}</button>
            <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden">
            <div className="relative h-40">
              <img src={p.image} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 text-[10px] font-bold bg-[var(--admin-accent-light)] text-black px-2 py-0.5 rounded">{p.tag}</span>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-[var(--admin-muted)] uppercase tracking-wide">{p.date}</p>
              <h4 className="text-sm font-bold mt-1">{p.titleEn}</h4>
              <p className="text-xs text-[var(--admin-muted)]">{p.titleHi}</p>
              <div className="flex gap-1.5 mt-3">
                <button onClick={() => { setForm(p); setEditing(p.id); setShowForm(true); }} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={() => del(p.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
