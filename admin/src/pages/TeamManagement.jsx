import React, { useEffect, useState, useRef } from "react";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  reorderMembers,
} from "../api/team.api";
import { getSettings, updateSettings } from "../api/settings.api";
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

/* ═══════════════════════ DRAGGABLE MEMBER ROW ═══════════════════════ */

const DraggableMemberRow = ({ member, index, onDragStart, onDragOver, onDrop, onEdit, onDelete }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className="flex items-center gap-3 bg-white border border-[var(--admin-border)] rounded-xl p-3 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing"
    >
      {/* Drag Handle */}
      <div className="flex-shrink-0 text-gray-400 hover:text-gray-600 px-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="3" r="1.5" />
          <circle cx="11" cy="3" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="13" r="1.5" />
          <circle cx="11" cy="13" r="1.5" />
        </svg>
      </div>

      {/* Order Badge */}
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold flex items-center justify-center">
        {index + 1}
      </span>

      {/* Photo */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--admin-accent)] flex-shrink-0">
        <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/team/${member.photo}`} alt={member.name?.en} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">{member.name?.en}</h4>
        <p className="text-xs text-[var(--admin-muted)] truncate">{member.role?.en}</p>
      </div>

      {/* Hindi */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-gray-700 truncate">{member.name?.hi}</p>
        <p className="text-xs text-gray-500 truncate">{member.role?.hi}</p>
      </div>

      {/* Tier Badge */}
      <span className={`flex-shrink-0 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${tierColors[member.tier]}`}>
        {tierLabels[member.tier]}
      </span>

      {/* Actions */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button onClick={() => onEdit(member)} className="px-2.5 py-1.5 text-[11px] rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
        <button onClick={() => onDelete(member._id)} className="px-2.5 py-1.5 text-[11px] rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Del</button>
      </div>
    </div>
  );
};

/* ═══════════════════════ TIER SECTION ═══════════════════════ */

const TierSection = ({ title, members, onDragStart, onDragOver, onDrop, onEdit, onDelete }) => {
  if (!members || members.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-4 space-y-2">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
        <span className="w-1.5 h-5 rounded bg-[var(--admin-maroon)]" />
        {title}
        <span className="text-xs font-normal text-[var(--admin-muted)]">({members.length} members)</span>
      </h3>
      <div className="space-y-2">
        {members.map((m, i) => (
          <DraggableMemberRow
            key={m._id}
            member={m}
            index={i}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════ EXECUTION LAYOUT BUILDER ═══════════════════════ */

const ExecutionLayoutBuilder = ({ layout, onChange, totalMembers }) => {
  const addRow = () => onChange([...layout, 3]);
  const removeRow = (idx) => {
    if (layout.length <= 1) return;
    onChange(layout.filter((_, i) => i !== idx));
  };
  const updateRow = (idx, val) => {
    const clamped = Math.max(1, Math.min(6, val));
    const updated = [...layout];
    updated[idx] = clamped;
    onChange(updated);
  };

  // Calculate how members distribute
  let distributed = 0;
  const rowInfo = layout.map((cols) => {
    const remaining = totalMembers - distributed;
    const count = Math.min(cols, remaining);
    distributed += count;
    return { cols, count, remaining: remaining > 0 };
  });
  const unassigned = totalMembers - distributed;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-800">Execution Grid Layout</h4>
          <p className="text-xs text-[var(--admin-muted)]">Define how many members per row. Extra members use the last row's column count.</p>
        </div>
        <button
          onClick={addRow}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] hover:opacity-90 transition-all"
        >
          + Add Row
        </button>
      </div>

      <div className="space-y-2">
        {layout.map((cols, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-xs font-bold text-gray-500 w-14">Row {idx + 1}</span>

            {/* Column stepper */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateRow(idx, cols - 1)}
                className="w-7 h-7 rounded-lg bg-white border border-gray-300 text-gray-600 text-sm font-bold hover:bg-gray-100 flex items-center justify-center"
              >−</button>
              <span className="w-8 text-center text-sm font-bold text-gray-800">{cols}</span>
              <button
                onClick={() => updateRow(idx, cols + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-gray-300 text-gray-600 text-sm font-bold hover:bg-gray-100 flex items-center justify-center"
              >+</button>
            </div>

            <span className="text-[11px] text-gray-400">cols</span>

            {/* Visual preview */}
            <div className="flex gap-1 flex-1">
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="h-3 flex-1 rounded bg-[var(--admin-accent)] max-w-8 opacity-60" />
              ))}
            </div>

            {/* Members count info */}
            <span className="text-[10px] text-gray-400 w-16 text-right">
              {rowInfo[idx]?.count || 0} / {cols}
            </span>

            {/* Remove */}
            {layout.length > 1 && (
              <button
                onClick={() => removeRow(idx)}
                className="w-6 h-6 rounded-full bg-red-50 text-red-500 text-xs flex items-center justify-center hover:bg-red-100"
              >✕</button>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-gray-500">
          Total layout slots: <b>{layout.reduce((a, b) => a + b, 0)}</b> | Members: <b>{totalMembers}</b>
        </span>
        {unassigned > 0 && (
          <span className="text-amber-600 font-semibold">
            +{unassigned} extra will use last row's {layout[layout.length - 1]} cols
          </span>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

const TeamManagement = () => {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Execution layout
  const [executionLayout, setExecutionLayout] = useState([3]);
  const [layoutSaving, setLayoutSaving] = useState(false);

  // Drag state — per section
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragTier = useRef(null);

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

  const fetchLayout = async () => {
    try {
      const data = await getSettings();
      if (data?.settings?.executionLayout?.length > 0) {
        setExecutionLayout(data.settings.executionLayout);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchLayout();
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
        setMembers((prev) => [...prev, data.member]);
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

  // --- Drag & Drop ---
  const handleDragStart = (tier) => (e, index) => {
    dragItem.current = index;
    dragTier.current = tier;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (tier) => (e, index) => {
    e.preventDefault();
    if (dragTier.current !== tier) return;
    dragOverItem.current = index;
  };

  const handleDrop = (tier) => async (e, index) => {
    e.preventDefault();
    if (dragTier.current !== tier) return;

    const tierMembers = members.filter((m) => m.tier === tier);
    const otherMembers = members.filter((m) => m.tier !== tier);

    const reordered = [...tierMembers];
    const [dragged] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, dragged);

    // Update local state immediately
    setMembers([...otherMembers, ...reordered]);

    // Persist
    try {
      await reorderMembers(reordered.map((m) => m._id));
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save order");
      fetchMembers(); // rollback
    }

    dragItem.current = null;
    dragOverItem.current = null;
    dragTier.current = null;
  };

  // --- Save Layout ---
  const handleSaveLayout = async () => {
    try {
      setLayoutSaving(true);
      await updateSettings({ executionLayout });
      toast.success("Execution layout saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save layout");
    } finally {
      setLayoutSaving(false);
    }
  };

  // Grouped members
  const founders = members.filter((m) => m.tier === "founder");
  const leaders = members.filter((m) => m.tier === "leader");
  const execution = members.filter((m) => m.tier === "execution");

  const isFounder = form.tier === "founder";

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Team Management</h2>
          <p className="text-xs text-[var(--admin-muted)]">{members.length} total members — Drag to reorder</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Member
        </button>
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

          {/* Founder-only fields */}
          {isFounder && (
            <>
              <hr className="border-[var(--admin-border)]" />
              <p className="text-xs font-bold text-[var(--admin-maroon)] uppercase tracking-wider">Additional fields for Founder</p>

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

              {/* Display Name & Designation */}
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

      {/* Drag & Drop Sections */}
      {!loading && (
        <div className="space-y-5">
          {/* Founders */}
          <TierSection
            title="Founding Body"
            members={founders}
            onDragStart={handleDragStart("founder")}
            onDragOver={handleDragOver("founder")}
            onDrop={handleDrop("founder")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Leaders */}
          <TierSection
            title="Leadership"
            members={leaders}
            onDragStart={handleDragStart("leader")}
            onDragOver={handleDragOver("leader")}
            onDrop={handleDrop("leader")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Execution Team */}
          <TierSection
            title="Execution Team"
            members={execution}
            onDragStart={handleDragStart("execution")}
            onDragOver={handleDragOver("execution")}
            onDrop={handleDrop("execution")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Execution Layout Builder */}
      {!loading && execution.length > 0 && (
        <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-5 space-y-4">
          <ExecutionLayoutBuilder
            layout={executionLayout}
            onChange={setExecutionLayout}
            totalMembers={execution.length}
          />
          <button
            onClick={handleSaveLayout}
            disabled={layoutSaving}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:opacity-90"
          >
            {layoutSaving ? "Saving..." : "Save Layout"}
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && members.length === 0 && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">No team members found</div>
      )}
    </div>
  );
};

export default TeamManagement;
