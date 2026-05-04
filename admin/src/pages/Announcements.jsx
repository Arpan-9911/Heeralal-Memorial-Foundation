import React, { useState } from "react";

const mockAnnouncements = [
  { id: 1, type: "event", titleEn: "Free Health Camp - April 10", titleHi: "मुफ्त स्वास्थ्य शिविर - 10 अप्रैल", excerptEn: "Annual free health screening for residents of outer Delhi.", excerptHi: "बाहरी दिल्ली के निवासियों के लिए वार्षिक मुफ्त स्वास्थ्य जांच।", date: "2026-04-10", active: true },
  { id: 2, type: "event", titleEn: "Women Empowerment Workshop - April 15", titleHi: "महिला सशक्तिकरण कार्यशाला - 15 अप्रैल", excerptEn: "Vocational training and financial literacy session.", excerptHi: "व्यावसायिक प्रशिक्षण और वित्तीय साक्षरता सत्र।", date: "2026-04-15", active: true },
  { id: 3, type: "press_release", titleEn: "HLMF Signs MOU with Central Delhi Education Department", titleHi: "HLMF ने मध्य दिल्ली शिक्षा विभाग के साथ MOU पर हस्ताक्षर किए", excerptEn: "New partnership aimed at enhancing employability of urban youth.", excerptHi: "शहरी युवाओं की रोजगार क्षमता बढ़ाने के उद्देश्य से नई साझेदारी।", date: "2026-04-20", active: true },
  { id: 4, type: "event", titleEn: "Blood Donation Camp - April 30", titleHi: "रक्तदान शिविर - 30 अप्रैल", excerptEn: "Community blood donation drive at Central Delhi campus.", excerptHi: "मध्य दिल्ली परिसर में सामुदायिक रक्तदान अभियान।", date: "2026-04-30", active: false },
];

const typeLabels = { event: "Event", press_release: "Press Release" };
const typeColors = { event: "bg-blue-100 text-blue-700", press_release: "bg-purple-100 text-purple-700" };

const Announcements = () => {
  const [items, setItems] = useState(mockAnnouncements);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ type: "event", titleEn: "", titleHi: "", excerptEn: "", excerptHi: "", date: "", active: true });

  const resetForm = () => { setForm({ type: "event", titleEn: "", titleHi: "", excerptEn: "", excerptHi: "", date: "", active: true }); setEditing(null); setShowForm(false); };
  const handleEdit = (item) => { setForm(item); setEditing(item.id); setShowForm(true); };
  const handleSave = () => {
    if (editing) { setItems((prev) => prev.map((i) => (i.id === editing ? { ...form, id: editing } : i))); }
    else { setItems((prev) => [...prev, { ...form, id: Date.now() }]); }
    resetForm();
  };
  const handleDelete = (id) => { setItems((prev) => prev.filter((i) => i.id !== id)); };
  const toggleActive = (id) => { setItems((prev) => prev.map((i) => (i.id === id ? { ...i, active: !i.active } : i))); };

  const filtered = items.filter((i) => filter === "all" || i.type === filter);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5">
          {["all", "event", "press_release"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? "bg-[var(--admin-maroon)] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f === "all" ? "All" : typeLabels[f]} ({f === "all" ? items.length : items.filter((i) => i.type === f).length})
            </button>
          ))}
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)] transition-colors">
          + Add Announcement
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit Announcement" : "New Announcement"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]">
                <option value="event">Event</option>
                <option value="press_release">Press Release</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 accent-[var(--admin-accent)]" />
                <span className="text-xs font-medium">Active</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Title (English)</label>
              <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Title (Hindi)</label>
              <input value={form.titleHi} onChange={(e) => setForm({ ...form, titleHi: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Excerpt (English)</label>
              <textarea value={form.excerptEn} onChange={(e) => setForm({ ...form, excerptEn: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] resize-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Excerpt (Hindi)</label>
              <textarea value={form.excerptHi} onChange={(e) => setForm({ ...form, excerptHi: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] resize-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black hover:bg-[var(--admin-accent-dark)] hover:text-white transition-colors">{editing ? "Update" : "Add"}</button>
            <button onClick={resetForm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--admin-border)]">
                <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium truncate max-w-xs">{item.titleEn}</p>
                    <p className="text-xs text-[var(--admin-muted)] truncate max-w-xs">{item.titleHi}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>{typeLabels[item.type]}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--admin-muted)]">{item.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(item.id)} className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full cursor-pointer ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => handleEdit(item)} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
