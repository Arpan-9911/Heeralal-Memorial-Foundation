import React, { useEffect, useState } from "react";

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../api/program.api";

const initialForm = {
  categoryEn: "",
  categoryHi: "",

  nameEn: "",
  nameHi: "",

  descEn: "",
  descHi: "",

  image: null,

  active: true,
};

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialForm);

  const fetchPrograms = async () => {
    try {
      setLoading(true);

      const data = await getPrograms();

      setPrograms(data?.programs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const resetForm = () => {
    setForm(initialForm);

    setEditing(null);

    setShowForm(false);
  };

  const handleEdit = (program) => {
    setForm({
      categoryEn: program.category?.en || "",

      categoryHi: program.category?.hi || "",

      nameEn: program.name?.en || "",

      nameHi: program.name?.hi || "",

      descEn: program.description?.en || "",

      descHi: program.description?.hi || "",

      image: null,

      active: program.active ?? true,
    });

    setEditing(program._id);

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.nameEn || !form.categoryEn) {
        alert("Please fill required fields");

        return;
      }

      if (!editing && !form.image) {
        alert("Please select image");

        return;
      }

      setSaving(true);

      const formData = new FormData();

      formData.append("categoryEn", form.categoryEn);

      formData.append("categoryHi", form.categoryHi);

      formData.append("nameEn", form.nameEn);

      formData.append("nameHi", form.nameHi);

      formData.append("descEn", form.descEn);

      formData.append("descHi", form.descHi);

      formData.append("active", form.active);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        const data = await updateProgram(editing, formData);

        setPrograms((prev) =>
          prev.map((p) => (p._id === editing ? data.program : p)),
        );
      } else {
        const data = await createProgram(formData);

        setPrograms((prev) => [data.program, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this programme?");

    if (!confirmDelete) return;

    try {
      await deleteProgram(id);

      setPrograms((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (program) => {
    try {
      const formData = new FormData();

      formData.append("categoryEn", program.category?.en);

      formData.append("categoryHi", program.category?.hi);

      formData.append("nameEn", program.name?.en);

      formData.append("nameHi", program.name?.hi);

      formData.append("descEn", program.description?.en);

      formData.append("descHi", program.description?.hi);

      formData.append("active", !program.active);

      const data = await updateProgram(program._id, formData);

      setPrograms((prev) =>
        prev.map((p) => (p._id === program._id ? data.program : p)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Programmes</h2>

          <p className="text-xs text-[var(--admin-muted)]">
            {programs.length} total programmes
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();

            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--admin-maroon)] text-white hover:opacity-90"
        >
          + Add Programme
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-5 space-y-5">
          <h3 className="text-sm font-bold">
            {editing ? "Edit Programme" : "Add Programme"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Category English"
              value={form.categoryEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryEn: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl"
            />

            <input
              placeholder="Category Hindi"
              value={form.categoryHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryHi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl"
            />

            <input
              placeholder="Programme Name English"
              value={form.nameEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  nameEn: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl"
            />

            <input
              placeholder="Programme Name Hindi"
              value={form.nameHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  nameHi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              rows={4}
              placeholder="Description English"
              value={form.descEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  descEn: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl resize-none"
            />

            <textarea
              rows={4}
              placeholder="Description Hindi"
              value={form.descHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  descHi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl resize-none"
            />
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-xl"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({
                    ...form,
                    active: e.target.checked,
                  })
                }
              />
              Active Programme
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-[var(--admin-accent)]"
            >
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={resetForm}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white border rounded-2xl p-10 text-center text-sm text-gray-500">
          Loading programmes...
        </div>
      )}

      {/* Empty */}
      {!loading && programs.length === 0 && (
        <div className="bg-white border rounded-2xl p-10 text-center text-sm text-gray-500">
          No programmes found
        </div>
      )}

      {/* Cards */}
      {!loading && programs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {programs.map((p) => (
            <div
              key={p._id}
              className="group bg-white rounded-2xl overflow-hidden border border-[var(--admin-border)] hover:shadow-xl transition-all duration-300"
            >
              {/* Top Image Section */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/programs/${p.image}`}
                  alt={p.name?.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                {/* Status */}
                <button
                  onClick={() => toggleStatus(p)}
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-md ${
                    p.active
                      ? "bg-green-500/20 text-green-100 border border-green-300/30"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  {p.active ? "Active" : "Inactive"}
                </button>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {/* Category */}
                  <div className="mb-2">
                    <p className="text-[10px] uppercase tracking-[0.18em]">
                      {p.category?.en}
                    </p>

                    <p className="text-[11px]">
                      {p.category?.hi}
                    </p>
                  </div>

                  {/* Names */}
                  <h3 className="text-lg font-bold leading-tight line-clamp-1">
                    {p.name?.en}
                  </h3>

                  <p className="text-sm mt-0.5 line-clamp-1">
                    {p.name?.hi}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="p-4 space-y-3">
                {/* English Desc */}
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                    English
                  </p>

                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {p.description?.en}
                  </p>
                </div>

                {/* Hindi Desc */}
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                    Hindi
                  </p>

                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {p.description?.hi}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 px-3 py-2 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programs;
