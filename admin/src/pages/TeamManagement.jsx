import React, { useEffect, useState } from "react";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../api/team.api";
import { toast } from "sonner";

const tierLabels = {
  founder: "Founder",
  leader: "Leadership",
  execution: "Execution Team",
};

const tierColors = {
  founder: "bg-amber-100 text-amber-800",
  leader: "bg-purple-100 text-purple-700",
  execution: "bg-blue-100 text-blue-700",
};

const initialForm = {
  tier: "execution",
  nameEn: "", nameHi: "",
  roleEn: "", roleHi: "",
  quoteEn: "", quoteHi: "",
  shortDescEn: "", shortDescHi: "",
  messageEn: "", messageHi: "",
  displayNameEn: "", displayNameHi: "",
  displayDesignationEn: "", displayDesignationHi: "",
  photo: null,
};

const inp = "w-full px-3 py-2 text-sm border rounded-lg";

const TeamManagement = () => {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Execution grid columns — stored in localStorage for now
  const [execGridCols, setExecGridCols] = useState(() => {
    return parseInt(localStorage.getItem("hlmf_exec_grid_cols") || "3", 10);
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getMembers();
      setMembers(data?.members || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setForm({
      tier: member.tier || "execution",
      nameEn: member.name?.en || "",
      nameHi: member.name?.hi || "",
      roleEn: member.role?.en || "",
      roleHi: member.role?.hi || "",
      quoteEn: member.quote?.en || "",
      quoteHi: member.quote?.hi || "",
      shortDescEn: member.shortDescription?.en || "",
      shortDescHi: member.shortDescription?.hi || "",
      messageEn: member.message?.en || "",
      messageHi: member.message?.hi || "",
      displayNameEn: member.displayName?.en || "",
      displayNameHi: member.displayName?.hi || "",
      displayDesignationEn: member.displayDesignation?.en || "",
      displayDesignationHi: member.displayDesignation?.hi || "",
      photo: null,
    });
    setEditing(member._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.nameEn || !form.roleEn) {
        alert("Please fill required fields");
        return;
      }
      if (!editing && !form.photo) {
        alert("Please select photo");
        return;
      }

      setSaving(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "photo") {
          if (value) formData.append("photo", value);
        } else {
          formData.append(key, value);
        }
      });

      if (editing) {
        const data = await updateMember(editing, formData);
        setMembers((prev) => prev.map((m) => (m._id === editing ? data.member : m)));
      } else {
        const data = await createMember(formData);
        setMembers((prev) => [data.member, ...prev]);
      }

      resetForm();
      toast.success(`Member ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this member?");
    if (!confirmDelete) return;
    try {
      await deleteMember(id);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      toast.success("Member deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete member");
    }
  };

  const handleGridColsChange = (cols) => {
    setExecGridCols(cols);
    localStorage.setItem("hlmf_exec_grid_cols", String(cols));
    toast.success(`Execution grid set to ${cols} columns`);
  };

  const filtered = members.filter((m) => filter === "all" || m.tier === filter);
  const isFounderOrLeader = form.tier === "founder" || form.tier === "leader";

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {["all", "founder", "leader", "execution"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-[var(--admin-maroon)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "All" : tierLabels[f]} (
              {f === "all" ? members.length : members.filter((m) => m.tier === f).length})
            </button>
          ))}
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Member
        </button>
      </div>

      {/* Execution Grid Columns Selector */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-bold">Execution Team Grid Layout</h3>
          <p className="text-xs text-[var(--admin-muted)]">Select how many members to show per row on the Teams page</p>
        </div>
        <div className="flex gap-2">
          {[2, 3, 4, 5].map((cols) => (
            <button
              key={cols}
              onClick={() => handleGridColsChange(cols)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                execGridCols === cols
                  ? "bg-[var(--admin-accent)] text-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cols} cols
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">
            {editing ? "Edit Member" : "Add Team Member"}
          </h3>

          {/* Tier + Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
              className={inp}
            >
              <option value="founder">Founder</option>
              <option value="leader">Leadership</option>
              <option value="execution">Execution Team</option>
            </select>
            <input placeholder="Name English *" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className={inp} />
            <input placeholder="Name Hindi *" value={form.nameHi} onChange={(e) => setForm({ ...form, nameHi: e.target.value })} className={inp} />
          </div>

          {/* Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Role / Designation English *" value={form.roleEn} onChange={(e) => setForm({ ...form, roleEn: e.target.value })} className={inp} />
            <input placeholder="Role / Designation Hindi" value={form.roleHi} onChange={(e) => setForm({ ...form, roleHi: e.target.value })} className={inp} />
          </div>

          {/* Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea placeholder="Quote English" value={form.quoteEn} onChange={(e) => setForm({ ...form, quoteEn: e.target.value })} rows={2} className={inp + " resize-none"} />
            <textarea placeholder="Quote Hindi" value={form.quoteHi} onChange={(e) => setForm({ ...form, quoteHi: e.target.value })} rows={2} className={inp + " resize-none"} />
          </div>

          {/* Founder/Leader-only fields */}
          {isFounderOrLeader && (
            <>
              <hr className="border-[var(--admin-border)]" />
              <p className="text-xs font-bold text-[var(--admin-maroon)] uppercase tracking-wider">Additional fields for Founding / Leadership Body</p>

              {/* Short Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea placeholder="Short Description English (shown on card)" value={form.shortDescEn} onChange={(e) => setForm({ ...form, shortDescEn: e.target.value })} rows={2} className={inp + " resize-none"} />
                <textarea placeholder="Short Description Hindi" value={form.shortDescHi} onChange={(e) => setForm({ ...form, shortDescHi: e.target.value })} rows={2} className={inp + " resize-none"} />
              </div>

              {/* Message (Read More) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea placeholder="Full Message English (shown in Read More)" value={form.messageEn} onChange={(e) => setForm({ ...form, messageEn: e.target.value })} rows={4} className={inp + " resize-none"} />
                <textarea placeholder="Full Message Hindi" value={form.messageHi} onChange={(e) => setForm({ ...form, messageHi: e.target.value })} rows={4} className={inp + " resize-none"} />
              </div>

              {/* Display Name & Designation (for message signature) */}
              <p className="text-xs text-[var(--admin-muted)]">Display name & designation shown at the bottom of the message (can differ from the main name/role)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Display Name English (message signature)" value={form.displayNameEn} onChange={(e) => setForm({ ...form, displayNameEn: e.target.value })} className={inp} />
                <input placeholder="Display Name Hindi" value={form.displayNameHi} onChange={(e) => setForm({ ...form, displayNameHi: e.target.value })} className={inp} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Display Designation English" value={form.displayDesignationEn} onChange={(e) => setForm({ ...form, displayDesignationEn: e.target.value })} className={inp} />
                <input placeholder="Display Designation Hindi" value={form.displayDesignationHi} onChange={(e) => setForm({ ...form, displayDesignationHi: e.target.value })} className={inp} />
              </div>
            </>
          )}

          {/* Photo */}
          <div>
            <input type="file" accept="image/*" className={inp} onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)]">
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">Loading members...</div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">No team members found</div>
      )}

      {/* Cards */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <div key={m._id} className="bg-white rounded-2xl border border-[var(--admin-border)] overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-5 flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--admin-accent)] flex-shrink-0">
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/team/${m.photo}`} alt={m.name?.en} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{m.name?.en}</h3>
                  <p className="text-xs text-[var(--admin-muted)] truncate">{m.role?.en}</p>
                  <div className="mt-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{m.name?.hi}</p>
                    <p className="text-xs text-gray-500 truncate">{m.role?.hi}</p>
                  </div>
                </div>
              </div>

              {(m.quote?.en || m.quote?.hi) && (
                <div className="px-5 pb-4 space-y-3">
                  {m.quote?.en && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">English Quote</p>
                      <p className="text-xs italic text-gray-600 leading-relaxed">"{m.quote.en}"</p>
                    </div>
                  )}
                  {m.quote?.hi && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Hindi Quote</p>
                      <p className="text-xs italic text-gray-600 leading-relaxed">"{m.quote.hi}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Show extra fields indicator for founder/leader */}
              {(m.tier === "founder" || m.tier === "leader") && m.shortDescription?.en && (
                <div className="px-5 pb-3">
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    ✓ Has short description & message
                  </span>
                </div>
              )}

              <div className="px-5 py-3 border-t border-[var(--admin-border)] flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${tierColors[m.tier]}`}>
                  {tierLabels[m.tier]}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(m)} className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(m._id)} className="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
