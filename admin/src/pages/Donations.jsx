import React, { useState } from "react";

const mockTiers = [
  { id: 1, amount: "₹500", titleEn: "Seed of Hope", titleHi: "आशा का बीज", descEn: "Educational supplies for one student for a month.", descHi: "एक छात्र को एक महीने के लिए शैक्षिक सामग्री।", icon: "📚", active: true },
  { id: 2, amount: "₹2,000", titleEn: "Pillar of Progress", titleHi: "प्रगति का स्तंभ", descEn: "Health screening for 10 individuals.", descHi: "10 व्यक्तियों की स्वास्थ्य जांच।", icon: "🏥", active: true },
  { id: 3, amount: "₹5,000", titleEn: "Beacon of Change", titleHi: "बदलाव की किरण", descEn: "Vocational training sponsorship.", descHi: "व्यावसायिक प्रशिक्षण प्रायोजन।", icon: "⚡", active: true },
  { id: 4, amount: "₹10,000+", titleEn: "Institutional Patron", titleHi: "संस्थागत संरक्षक", descEn: "Infrastructure and programme sustainability.", descHi: "बुनियादी ढांचा और कार्यक्रम स्थिरता।", icon: "🏛️", active: true },
];

const mockBank = [
  { key: "accountName", label: "Account Name", value: "Heeralal Memorial Foundation" },
  { key: "bankName", label: "Bank Name", value: "State Bank of India" },
  { key: "accountNo", label: "Account No.", value: "XXXXXXXXXXXX" },
  { key: "ifsc", label: "IFSC Code", value: "SBIN0XXXXXX" },
  { key: "branch", label: "Branch", value: "Central Delhi Branch" },
];

const Donations = () => {
  const [tiers, setTiers] = useState(mockTiers);
  const [bank, setBank] = useState(mockBank);
  const [editingBank, setEditingBank] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const empty = { amount: "", titleEn: "", titleHi: "", descEn: "", descHi: "", icon: "📚", active: true };
  const [form, setForm] = useState(empty);

  const reset = () => { setForm(empty); setEditing(null); setShowForm(false); };
  const save = () => { if (editing) setTiers(p => p.map(i => i.id === editing ? { ...form, id: editing } : i)); else setTiers(p => [...p, { ...form, id: Date.now() }]); reset(); };
  const del = (id) => setTiers(p => p.filter(i => i.id !== id));
  const tog = (id) => setTiers(p => p.map(i => i.id === id ? { ...i, active: !i.active } : i));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-6">
      {/* Donation Tiers */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Donation Tiers ({tiers.length})</h3>
          <button onClick={() => { reset(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Tier</button>
        </div>
        {showForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Amount</label><input value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="₹500" className={inp} /></div>
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Title (EN)</label><input value={form.titleEn} onChange={e => setForm({ ...form, titleEn: e.target.value })} className={inp} /></div>
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Title (HI)</label><input value={form.titleHi} onChange={e => setForm({ ...form, titleHi: e.target.value })} className={inp} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Description (EN)</label><input value={form.descEn} onChange={e => setForm({ ...form, descEn: e.target.value })} className={inp} /></div>
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Description (HI)</label><input value={form.descHi} onChange={e => setForm({ ...form, descHi: e.target.value })} className={inp} /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">{editing ? "Update" : "Add"}</button>
              <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">Cancel</button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tiers.map(t => (
            <div key={t.id} className={`border rounded-xl p-4 text-center ${t.active ? "border-[var(--admin-border)]" : "border-dashed border-gray-300 opacity-50"}`}>
              <div className="text-2xl mb-2">{t.icon}</div>
              <h4 className="text-lg font-bold">{t.amount}</h4>
              <p className="text-xs text-[var(--admin-muted)] font-semibold uppercase">{t.titleEn}</p>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{t.descEn}</p>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <button onClick={() => tog(t.id)} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{t.active ? "On" : "Off"}</button>
                <button onClick={() => { setForm(t); setEditing(t.id); setShowForm(true); }} className="px-2 py-0.5 text-[10px] rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={() => del(t.id)} className="px-2 py-0.5 text-[10px] rounded-lg bg-red-50 text-red-600">Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Bank Transfer Details</h3>
          <button onClick={() => setEditingBank(!editingBank)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200">{editingBank ? "Done" : "Edit"}</button>
        </div>
        <div className="border border-[var(--admin-border)] rounded-lg overflow-hidden">
          {bank.map((item, i) => (
            <div key={item.key} className={`flex items-center px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
              <span className="font-semibold text-[var(--admin-muted)] text-xs min-w-[130px]">{item.label}:</span>
              {editingBank ? (
                <input value={item.value} onChange={e => setBank(p => p.map(b => b.key === item.key ? { ...b, value: e.target.value } : b))} className="flex-1 px-2 py-1 text-xs border border-[var(--admin-border)] rounded outline-none focus:border-[var(--admin-accent)]" />
              ) : (
                <span className="text-xs text-gray-700">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;
