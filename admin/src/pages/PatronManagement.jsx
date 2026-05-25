import React, { useEffect, useState, useRef } from "react";
import {
  getPatrons,
  createPatron,
  updatePatron,
  deletePatron,
  reorderPatrons,
} from "../api/patron.api";
import { toast } from "sonner";

const initialForm = {
  nameEn: "", nameHi: "",
  roleEn: "", roleHi: "",
  quoteEn: "", quoteHi: "",
  photo: null,
};

const inp = "w-full px-3 py-2 text-sm border rounded-lg";

/* ═══════════════════════ DRAGGABLE PATRON ROW ═══════════════════════ */

const DraggablePatronRow = ({ patron, index, onDragStart, onDragOver, onDrop, onEdit, onDelete }) => {
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
        <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/patrons/${patron.photo}`} alt={patron.name?.en} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">{patron.name?.en}</h4>
        <p className="text-xs text-[var(--admin-muted)] truncate">{patron.role?.en}</p>
      </div>

      {/* Hindi */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-gray-700 truncate">{patron.name?.hi}</p>
        <p className="text-xs text-gray-500 truncate">{patron.role?.hi}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button onClick={() => onEdit(patron)} className="px-2.5 py-1.5 text-[11px] rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
        <button onClick={() => onDelete(patron._id)} className="px-2.5 py-1.5 text-[11px] rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Del</button>
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

const PatronManagement = () => {
  const [patrons, setPatrons] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Drag state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchPatrons = async () => {
    try {
      setLoading(true);
      const data = await getPatrons();
      setPatrons(data?.patrons || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch patrons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatrons();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (patron) => {
    setForm({
      nameEn: patron.name?.en || "",
      nameHi: patron.name?.hi || "",
      roleEn: patron.role?.en || "",
      roleHi: patron.role?.hi || "",
      quoteEn: patron.quote?.en || "",
      quoteHi: patron.quote?.hi || "",
      photo: null,
    });
    setEditing(patron._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.nameEn || !form.nameHi || !form.roleEn || !form.roleHi) {
        alert("Please fill name and role in both languages");
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
        const data = await updatePatron(editing, formData);
        setPatrons((prev) => prev.map((p) => (p._id === editing ? data.patron : p)));
      } else {
        const data = await createPatron(formData);
        setPatrons((prev) => [...prev, data.patron]);
      }

      resetForm();
      toast.success(`Patron ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save patron");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this patron?");
    if (!confirmDelete) return;
    try {
      await deletePatron(id);
      setPatrons((prev) => prev.filter((p) => p._id !== id));
      toast.success("Patron deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete patron");
    }
  };

  // --- Drag & Drop ---
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    const reordered = [...patrons];
    const [dragged] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, dragged);

    // Update local state immediately
    setPatrons(reordered);

    // Persist
    try {
      await reorderPatrons(reordered.map((p) => p._id));
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save order");
      fetchPatrons(); // rollback
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Patrons Management</h2>
          <p className="text-xs text-[var(--admin-muted)]">{patrons.length} total patrons — Drag to reorder</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:opacity-90 transition-opacity"
        >
          + Add Patron
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">
            {editing ? "Edit Patron" : "Add Patron"}
          </h3>

          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Name (English) *</label>
              <input placeholder="Name English" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Name (Hindi) *</label>
              <input placeholder="Name Hindi" value={form.nameHi} onChange={(e) => setForm({ ...form, nameHi: e.target.value })} className={inp} />
            </div>
          </div>

          {/* Role fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Designation / Role (English) *</label>
              <input placeholder="Designation English" value={form.roleEn} onChange={(e) => setForm({ ...form, roleEn: e.target.value })} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Designation / Role (Hindi) *</label>
              <input placeholder="Designation Hindi" value={form.roleHi} onChange={(e) => setForm({ ...form, roleHi: e.target.value })} className={inp} />
            </div>
          </div>

          {/* Quote fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Quote (English)</label>
              <textarea placeholder="Quote English" value={form.quoteEn} onChange={(e) => setForm({ ...form, quoteEn: e.target.value })} rows={3} className={inp + " resize-none"} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Quote (Hindi)</label>
              <textarea placeholder="Quote Hindi" value={form.quoteHi} onChange={(e) => setForm({ ...form, quoteHi: e.target.value })} rows={3} className={inp + " resize-none"} />
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Profile Photo {!editing && "*"}</label>
            <input type="file" accept="image/*" className={inp} onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
          </div>

          {/* Buttons */}
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
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">Loading patrons...</div>
      )}

      {/* Patrons list */}
      {!loading && patrons.length > 0 && (
        <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-4 space-y-2">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
            <span className="w-1.5 h-5 rounded bg-[var(--admin-maroon)]" />
            All Patrons
            <span className="text-xs font-normal text-[var(--admin-muted)]">({patrons.length} patrons)</span>
          </h3>
          <div className="space-y-2">
            {patrons.map((patron, i) => (
              <DraggablePatronRow
                key={patron._id}
                patron={patron}
                index={i}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && patrons.length === 0 && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">No patrons found. Click "+ Add Patron" to create one.</div>
      )}
    </div>
  );
};

export default PatronManagement;
