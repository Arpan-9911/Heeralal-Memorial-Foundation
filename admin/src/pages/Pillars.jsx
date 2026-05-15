import React, { useEffect, useState } from "react";

import {
  getPillars,
  createPillar,
  updatePillar,
  deletePillar,
} from "../api/pillar.api";
import { toast } from "sonner";

const Pillars = () => {
  const [pillars, setPillars] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const empty = {
    icon: "📚",
    titleEn: "",
    titleHi: "",
    descEn: "",
    descHi: "",
  };

  const [form, setForm] = useState(empty);

  const inp =
    "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  // FETCH
  const fetchPillars = async () => {
    try {
      setLoading(true);

      const data = await getPillars();

      setPillars(data?.pillars || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPillars();
  }, []);

  // RESET
  const reset = () => {
    setForm(empty);

    setEditing(null);

    setShowForm(false);
  };

  // SAVE
  const save = async () => {
    try {
      if (!form.titleEn || !form.titleHi || !form.descEn || !form.descHi) {
        alert("Please fill all fields");
        return;
      }

      setSaving(true);

      const payload = {
        icon: form.icon,
        titleEn: form.titleEn,
        titleHi: form.titleHi,
        descEn: form.descEn,
        descHi: form.descHi,
      };

      if (editing) {
        const res = await updatePillar(editing, payload);

        setPillars((prev) =>
          prev.map((i) => (i._id === editing ? res.pillar : i))
        );
      } else {
        const res = await createPillar(payload);

        setPillars((prev) => [...prev, res.pillar]);
      }

      reset();
      toast.success(`Pillar ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save pillar");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const del = async (id) => {
    const confirmDelete = window.confirm("Delete this pillar?");

    if (!confirmDelete) return;

    try {
      await deletePillar(id);

      setPillars((prev) => prev.filter((i) => i._id !== id));
      toast.success("Pillar deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete pillar");
    }
  };

  return (
    <div className="space-y-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">
          These pillars appear on the Home page under "Pillars of Institutional
          Impact".
        </p>

        <button
          onClick={() => {
            reset();

            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Pillar
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">
            {editing ? "Edit" : "New"} Pillar
          </h3>

          {/* Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Icon (emoji)
              </label>

              <input
                value={form.icon}
                onChange={(e) =>
                  setForm({
                    ...form,
                    icon: e.target.value,
                  })
                }
                className={inp}
              />
            </div>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Title (EN)
              </label>
              <input
                value={form.titleEn}
                onChange={(e) =>
                  setForm({ ...form, titleEn: e.target.value })
                }
                placeholder="Educational Upliftment"
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Title (HI)
              </label>
              <input
                value={form.titleHi}
                onChange={(e) =>
                  setForm({ ...form, titleHi: e.target.value })
                }
                placeholder="शैक्षिक उत्थान"
                className={inp}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Description (EN)
              </label>
              <textarea
                rows={3}
                value={form.descEn}
                onChange={(e) =>
                  setForm({ ...form, descEn: e.target.value })
                }
                placeholder="Providing scholarships and infrastructure support..."
                className={inp + " resize-none"}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Description (HI)
              </label>
              <textarea
                rows={3}
                value={form.descHi}
                onChange={(e) =>
                  setForm({ ...form, descHi: e.target.value })
                }
                placeholder="छात्रवृत्ति और बुनियादी ढांचे..."
                className={inp + " resize-none"}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black"
            >
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={reset}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PILLARS LIST */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : pillars.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-400">
          No pillars added yet. The homepage will show the default pillars.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl border border-[var(--admin-border)] p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{p.icon}</div>

              <h3 className="text-sm font-bold text-gray-900">
                {p.title?.en}
              </h3>

              <p className="text-[11px] text-gray-500 mt-0.5">
                {p.title?.hi}
              </p>

              <div className="w-8 h-[2px] bg-[var(--admin-accent)] mx-auto my-2" />

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {p.desc?.en}
              </p>

              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                {p.desc?.hi}
              </p>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <button
                  onClick={() => {
                    setEditing(p._id);

                    setShowForm(true);

                    setForm({
                      icon: p.icon,
                      titleEn: p.title?.en,
                      titleHi: p.title?.hi,
                      descEn: p.desc?.en,
                      descHi: p.desc?.hi,
                    });
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => del(p._id)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pillars;
