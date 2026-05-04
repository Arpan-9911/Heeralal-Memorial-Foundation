import React, { useState } from "react";

const mockTeam = [
  { id: 1, tier: "founder", nameEn: "Late Shri Heeralal Ji", nameHi: "स्वर्गीय श्री हीरालाल जी", roleEn: "Institutional Founder", roleHi: "संस्थागत संस्थापक", photo: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=200", quoteEn: "The foundation of any society rests upon the strength of its character.", quoteHi: "किसी भी समाज की नींव उसके चरित्र की मजबूती पर टिकी होती है।" },
  { id: 2, tier: "leader", nameEn: "Dr. Preeti Singh", nameHi: "डॉ. प्रीति सिंह", roleEn: "Managing Director", roleHi: "प्रबंध निदेशक", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", quoteEn: "We build sustainable ecosystems for growth.", quoteHi: "हम विकास के लिए टिकाऊ पारिस्थितिकी तंत्र का निर्माण करते हैं।" },
  { id: 3, tier: "leader", nameEn: "Mr. Arjun Malhotra", nameHi: "श्री अर्जुन मल्होत्रा", roleEn: "Director of Finance", roleHi: "वित्त निदेशक", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", quoteEn: "Innovation in social service is a necessity.", quoteHi: "सामाजिक सेवा में नवाचार एक आवश्यकता है।" },
  { id: 4, tier: "execution", nameEn: "Mr. Rajesh Gupta", nameHi: "श्री राजेश गुप्ता", roleEn: "Chief Technical Officer", roleHi: "मुख्य तकनीकी अधिकारी", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", quoteEn: "", quoteHi: "" },
  { id: 5, tier: "execution", nameEn: "Ms. Anjali Sharma", nameHi: "सुश्री अंजलि शर्मा", roleEn: "Head of Education", roleHi: "शिक्षा प्रमुख", photo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=200", quoteEn: "", quoteHi: "" },
  { id: 6, tier: "execution", nameEn: "Dr. Vivek Mehra", nameHi: "डॉ. विवेक मेहरा", roleEn: "Medical Coordinator", roleHi: "चिकित्सा समन्वयक", photo: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=200", quoteEn: "", quoteHi: "" },
];

const tierLabels = { founder: "Founder", leader: "Leadership", execution: "Execution Team" };
const tierColors = { founder: "bg-amber-100 text-amber-800", leader: "bg-purple-100 text-purple-700", execution: "bg-blue-100 text-blue-700" };

const TeamManagement = () => {
  const [members, setMembers] = useState(mockTeam);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ tier: "execution", nameEn: "", nameHi: "", roleEn: "", roleHi: "", photo: "", quoteEn: "", quoteHi: "" });

  const resetForm = () => { setForm({ tier: "execution", nameEn: "", nameHi: "", roleEn: "", roleHi: "", photo: "", quoteEn: "", quoteHi: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (m) => { setForm(m); setEditing(m.id); setShowForm(true); };
  const handleSave = () => {
    if (editing) { setMembers((prev) => prev.map((m) => (m.id === editing ? { ...form, id: editing } : m))); }
    else { setMembers((prev) => [...prev, { ...form, id: Date.now() }]); }
    resetForm();
  };
  const handleDelete = (id) => { setMembers((prev) => prev.filter((m) => m.id !== id)); };

  const filtered = members.filter((m) => filter === "all" || m.tier === filter);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5">
          {["all", "founder", "leader", "execution"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? "bg-[var(--admin-maroon)] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f === "all" ? "All" : tierLabels[f]} ({f === "all" ? members.length : members.filter((m) => m.tier === f).length})
            </button>
          ))}
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)] transition-colors">
          + Add Member
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit Member" : "Add Team Member"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Tier</label>
              <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]">
                <option value="founder">Founder</option>
                <option value="leader">Leadership</option>
                <option value="execution">Execution Team</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Name (English)</label>
              <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Name (Hindi)</label>
              <input value={form.nameHi} onChange={(e) => setForm({ ...form, nameHi: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Role (English)</label>
              <input value={form.roleEn} onChange={(e) => setForm({ ...form, roleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Role (Hindi)</label>
              <input value={form.roleHi} onChange={(e) => setForm({ ...form, roleHi: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--admin-muted)]">Photo URL</label>
            <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
          </div>
          {(form.tier === "founder" || form.tier === "leader") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--admin-muted)]">Quote (English)</label>
                <textarea value={form.quoteEn} onChange={(e) => setForm({ ...form, quoteEn: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--admin-muted)]">Quote (Hindi)</label>
                <textarea value={form.quoteHi} onChange={(e) => setForm({ ...form, quoteHi: e.target.value })} rows={2} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] resize-none" />
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black hover:bg-[var(--admin-accent-dark)] hover:text-white transition-colors">{editing ? "Update" : "Add"}</button>
            <button onClick={resetForm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--admin-accent)]">
                <img src={m.photo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{m.nameEn}</p>
                <p className="text-xs text-[var(--admin-muted)] truncate">{m.roleEn}</p>
              </div>
            </div>
            {m.quoteEn && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 italic line-clamp-2">"{m.quoteEn}"</p>
              </div>
            )}
            <div className="px-4 py-3 border-t border-[var(--admin-border)] flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tierColors[m.tier]}`}>{tierLabels[m.tier]}</span>
              <div className="flex gap-1.5">
                <button onClick={() => handleEdit(m)} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
                <button onClick={() => handleDelete(m.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
