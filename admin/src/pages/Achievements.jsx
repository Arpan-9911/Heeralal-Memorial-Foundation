import React, { useEffect, useState } from "react";
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../api/achievement.api";
import { toast } from "sonner";

const initialForm = {
  titleEn: "",
  titleHi: "",
  descEn: "",
  descHi: "",
  presentedByEn: "",
  presentedByHi: "",
  image: null,
};

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setItems(data?.achievements || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const reset = () => {
    setForm(initialForm);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (achievement) => {
    setForm({
      titleEn: achievement.title?.en || "",
      titleHi: achievement.title?.hi || "",
      descEn: achievement.description?.en || "",
      descHi: achievement.description?.hi || "",
      presentedByEn: achievement.presentedBy?.en || "",
      presentedByHi: achievement.presentedBy?.hi || "",
      image: null,
    });

    setEditing(achievement._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.titleEn) {
        alert("Please enter title");
        return;
      }
      if (!editing && !form.image) {
        alert("Please select image");
        return;
      }

      setSaving(true);
      const formData = new FormData();
      formData.append("titleEn", form.titleEn);
      formData.append("titleHi", form.titleHi);
      formData.append("descEn", form.descEn);
      formData.append("descHi", form.descHi);
      formData.append("presentedByEn", form.presentedByEn);
      formData.append("presentedByHi", form.presentedByHi);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        const data = await updateAchievement(editing, formData);
        setItems((prev) =>
          prev.map((i) => (i._id === editing ? data.achievement : i)),
        );
      } else {
        const data = await createAchievement(formData);
        setItems((prev) => [data.achievement, ...prev]);
      }

      reset();
      toast.success("Achievement saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save achievement");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this achievement?");
    if (!confirmDelete) return;
    try {
      await deleteAchievement(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Achievement deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete achievement");
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-[var(--admin-border)] rounded-xl outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-5">
      {/* Top */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
          <p className="text-xs text-[var(--admin-muted)]">
            {items.length} total achievements
          </p>
        </div>

        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--admin-maroon)] text-white hover:opacity-90 transition-all"
        >
          + Add Achievement
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-5 space-y-5">
          <h3 className="text-sm font-bold text-gray-800">
            {editing ? "Edit Achievement" : "Add Achievement"}
          </h3>

          {/* Image */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className={inputClass}
            />
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Title English
              </label>

              <input
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Title Hindi
              </label>

              <input
                value={form.titleHi}
                onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Presented By */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Presented By English
              </label>

              <input
                value={form.presentedByEn}
                onChange={(e) =>
                  setForm({ ...form, presentedByEn: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Presented By Hindi
              </label>

              <input
                value={form.presentedByHi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    presentedByHi: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Description English
              </label>

              <textarea
                rows={4}
                value={form.descEn}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descEn: e.target.value,
                  })
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Description Hindi
              </label>

              <textarea
                rows={4}
                value={form.descHi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descHi: e.target.value,
                  })
                }
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--admin-accent)] hover:opacity-90 transition-all"
            >
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={reset}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl border p-10 text-center text-sm text-gray-500">
          Loading achievements...
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="bg-white rounded-2xl border p-10 text-center text-sm text-gray-500">
          No achievements found
        </div>
      )}

      {/* Cards */}
      {!loading && items.length > 0 && (
        <div className="space-y-3">
          {items.map((a) => (
            <div
              key={a._id}
              className="relative bg-white border border-[var(--admin-border)] rounded-2xl p-3 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-3">
                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/achievements/${a.image}`}
                    alt={a.title?.en}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-24">
                  {/* Top Right Presented By */}
                  <div className="absolute top-3 right-3 text-right max-w-[180px]">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                      Presented By
                    </p>

                    <p className="text-xs font-semibold text-[var(--admin-maroon)] leading-tight line-clamp-1">
                      {a.presentedBy?.en}
                    </p>

                    <p className="text-[11px] text-gray-500 leading-tight line-clamp-1">
                      {a.presentedBy?.hi}
                    </p>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug pr-2">
                      {a.title?.en}
                    </h3>

                    <p className="text-xs text-[var(--admin-muted)] mt-0.5 leading-snug pr-2">
                      {a.title?.hi}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {a.description?.en}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {a.description?.hi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(a._id)}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
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

export default Achievements;
