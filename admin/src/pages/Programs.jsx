import React, { useState } from "react";

const mockPrograms = [
  { id: 1, catEn: "Education", catHi: "शिक्षा", nameEn: "Vidya Jyoti", nameHi: "विद्या ज्योति", descEn: "Scholarships and digital literacy for rural students.", descHi: "ग्रामीण छात्रों को छात्रवृत्ति और डिजिटल साक्षरता।", active: true },
  { id: 2, catEn: "Healthcare", catHi: "स्वास्थ्य", nameEn: "Swasthya Seva", nameHi: "स्वास्थ्य सेवा", descEn: "Mobile health clinics in urban slums.", descHi: "शहरी झुग्गियों में मोबाइल क्लीनिक।", active: true },
  { id: 3, catEn: "Women Empowerment", catHi: "महिला सशक्तिकरण", nameEn: "Shakti Pariyojana", nameHi: "शक्ति परियोजना", descEn: "Skill development for financial independence.", descHi: "वित्तीय स्वतंत्रता हेतु कौशल विकास।", active: true },
  { id: 4, catEn: "Sustainability", catHi: "स्थिरता", nameEn: "Paryavaran Raksha", nameHi: "पर्यावरण रक्षा", descEn: "Tree plantation and water harvesting.", descHi: "वृक्षारोपण और जल संचयन।", active: true },
];

const Programs = () => {
  const [items, setItems] = useState(mockPrograms);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const empty = { catEn: "", catHi: "", nameEn: "", nameHi: "", descEn: "", descHi: "", active: true };
  const [form, setForm] = useState(empty);

  const reset = () => { setForm(empty); setEditing(null); setShowForm(false); };
  const save = () => { if (editing) setItems(p => p.map(i => i.id === editing ? { ...form, id: editing } : i)); else setItems(p => [...p, { ...form, id: Date.now() }]); reset(); };
  const del = (id) => setItems(p => p.filter(i => i.id !== id));
  const tog = (id) => setItems(p => p.map(i => i.id === id ? { ...i, active: !i.active } : i));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">{items.length} programmes</p>
        <button onClick={() => { reset(); setShowForm(true); }} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Programme</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Programme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[["catEn","Category (EN)"],["catHi","Category (HI)"],["nameEn","Name (EN)"],["nameHi","Name (HI)"]].map(([k,l])=>(
              <div key={k} className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">{l}</label><input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className={inp}/></div>
            ))}
            {[["descEn","Description (EN)"],["descHi","Description (HI)"]].map(([k,l])=>(
              <div key={k} className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">{l}</label><textarea value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} rows={2} className={inp + " resize-none"}/></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">{editing?"Update":"Add"}</button>
            <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b border-[var(--admin-border)]">
            <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Programme</th>
            <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Category</th>
            <th className="text-left text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Status</th>
            <th className="text-right text-xs font-semibold text-[var(--admin-muted)] px-4 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map(p=>(
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><p className="font-medium">{p.nameEn}</p><p className="text-xs text-[var(--admin-muted)]">{p.nameHi}</p></td>
                <td className="px-4 py-3 text-xs">{p.catEn}</td>
                <td className="px-4 py-3"><button onClick={()=>tog(p.id)} className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${p.active?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{p.active?"Active":"Inactive"}</button></td>
                <td className="px-4 py-3 text-right flex justify-end gap-1.5">
                  <button onClick={()=>{setForm(p);setEditing(p.id);setShowForm(true);}} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                  <button onClick={()=>del(p.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Programs;
