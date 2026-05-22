import React, { useEffect, useState, useRef } from "react";

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  reorderPrograms,
} from "../api/program.api";
import { toast } from "sonner";

const initialForm = {
  categoryEn: "",
  categoryHi: "",
  nameEn: "",
  nameHi: "",
  descEn: "",
  descHi: "",
  longDescEn: "",
  longDescHi: "",
  locationEn: "",
  locationHi: "",
  centresEn: "",
  centresHi: "",
  image: null,
  active: true,
  centresList: [],
};

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-[var(--admin-border)] rounded-xl outline-none focus:border-[var(--admin-accent)]";

const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wide";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Drag state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

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
    const reordered = [...programs];
    const [dragged] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, dragged);

    // Update local state immediately
    setPrograms(reordered);

    // Persist
    try {
      await reorderPrograms(reordered.map((p) => p._id));
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save order");
      fetchPrograms(); // rollback
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

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
      longDescEn: program.longDescription?.en || "",
      longDescHi: program.longDescription?.hi || "",
      locationEn: program.location?.en || "",
      locationHi: program.location?.hi || "",
      centresEn: program.centres?.en || "",
      centresHi: program.centres?.hi || "",
      image: null,
      active: program.active ?? true,
      centresList: program.centresList ? program.centresList.map(c => ({ ...c, file: null })) : [],
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
      formData.append("longDescEn", form.longDescEn);
      formData.append("longDescHi", form.longDescHi);
      formData.append("locationEn", form.locationEn);
      formData.append("locationHi", form.locationHi);
      formData.append("centresEn", form.centresEn);
      formData.append("centresHi", form.centresHi);
      formData.append("active", form.active);

      // Serialize centres list (stripping the temporary client-side File objects)
      const serializedCentres = (form.centresList || []).map(centre => {
        const { file, ...rest } = centre;
        return rest;
      });
      formData.append("centresList", JSON.stringify(serializedCentres));

      // Append raw files for dynamic centre images
      (form.centresList || []).forEach((centre, index) => {
        if (centre.file) {
          formData.append(`centreImage_${index}`, centre.file);
        }
      });

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
      toast.success(`Programme ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save programme");
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
      toast.success("Programme deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete programme");
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
      formData.append("longDescEn", program.longDescription?.en || "");
      formData.append("longDescHi", program.longDescription?.hi || "");
      formData.append("locationEn", program.location?.en || "");
      formData.append("locationHi", program.location?.hi || "");
      formData.append("centresEn", program.centres?.en || "");
      formData.append("centresHi", program.centres?.hi || "");
      formData.append("active", !program.active);
      formData.append("centresList", JSON.stringify(program.centresList || []));

      const data = await updateProgram(program._id, formData);
      setPrograms((prev) =>
        prev.map((p) => (p._id === program._id ? data.program : p)),
      );
      toast.success("Programme status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
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

          {/* Category */}
          <div>
            <p className={`${labelClass} mb-2`}>Category</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Category English"
                value={form.categoryEn}
                onChange={(e) => setForm({ ...form, categoryEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Category Hindi"
                value={form.categoryHi}
                onChange={(e) => setForm({ ...form, categoryHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <p className={`${labelClass} mb-2`}>Programme Name</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Name English"
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Name Hindi"
                value={form.nameHi}
                onChange={(e) => setForm({ ...form, nameHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Short Description (card view) */}
          <div>
            <p className={`${labelClass} mb-2`}>Short Description (shown on card)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={3}
                placeholder="Short Description English"
                value={form.descEn}
                onChange={(e) => setForm({ ...form, descEn: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <textarea
                rows={3}
                placeholder="Short Description Hindi"
                value={form.descHi}
                onChange={(e) => setForm({ ...form, descHi: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Long Description (popup) */}
          <div>
            <p className={`${labelClass} mb-2`}>Long Description (shown in Read More popup)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={5}
                placeholder="Long Description English"
                value={form.longDescEn}
                onChange={(e) => setForm({ ...form, longDescEn: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <textarea
                rows={5}
                placeholder="Long Description Hindi"
                value={form.longDescHi}
                onChange={(e) => setForm({ ...form, longDescHi: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <p className={`${labelClass} mb-2`}>📍 Location (shown in popup)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Location English"
                value={form.locationEn}
                onChange={(e) => setForm({ ...form, locationEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Location Hindi"
                value={form.locationHi}
                onChange={(e) => setForm({ ...form, locationHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Centres */}
          <div>
            <p className={`${labelClass} mb-2`}>🏢 Name of Centres (shown in popup)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={3}
                placeholder="Centre names English (one per line)"
                value={form.centresEn}
                onChange={(e) => setForm({ ...form, centresEn: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <textarea
                rows={3}
                placeholder="Centre names Hindi (one per line)"
                value={form.centresHi}
                onChange={(e) => setForm({ ...form, centresHi: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Multiple Centres List */}
          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${labelClass}`}>🏢 Multiple Centres (with Photo & Location)</p>
                <p className="text-[10px] text-gray-400 normal-case mt-0.5">
                  Add specific centres with their names, locations, and photographs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForm({
                    ...form,
                    centresList: [
                      ...(form.centresList || []),
                      {
                        name: { en: "", hi: "" },
                        location: { en: "", hi: "" },
                        image: "",
                        file: null,
                      },
                    ],
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                + Add Centre
              </button>
            </div>

            {form.centresList && form.centresList.length > 0 && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
                {form.centresList.map((centre, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-gray-100 rounded-xl space-y-3 relative shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (form.centresList || []).filter((_, i) => i !== index);
                        setForm({ ...form, centresList: updated });
                      }}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xs"
                    >
                      Remove
                    </button>

                    <p className="text-xs font-bold text-gray-700">Centre #{index + 1}</p>

                    {/* Bilingual Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">Name (English)</span>
                        <input
                          placeholder="e.g. Heeralal Memorial Center"
                          value={centre.name?.en || ""}
                          onChange={(e) => {
                            const updated = [...form.centresList];
                            updated[index] = {
                              ...updated[index],
                              name: { ...updated[index].name, en: e.target.value },
                            };
                            setForm({ ...form, centresList: updated });
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">Name (Hindi)</span>
                        <input
                          placeholder="उदा. हीरालाल मेमोरियल सेंटर"
                          value={centre.name?.hi || ""}
                          onChange={(e) => {
                            const updated = [...form.centresList];
                            updated[index] = {
                              ...updated[index],
                              name: { ...updated[index].name, hi: e.target.value },
                            };
                            setForm({ ...form, centresList: updated });
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Bilingual Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">Location (English)</span>
                        <input
                          placeholder="e.g. Kolkata, West Bengal"
                          value={centre.location?.en || ""}
                          onChange={(e) => {
                            const updated = [...form.centresList];
                            updated[index] = {
                              ...updated[index],
                              location: { ...updated[index].location, en: e.target.value },
                            };
                            setForm({ ...form, centresList: updated });
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">Location (Hindi)</span>
                        <input
                          placeholder="उदा. कोलकाता, पश्चिम बंगाल"
                          value={centre.location?.hi || ""}
                          onChange={(e) => {
                            const updated = [...form.centresList];
                            updated[index] = {
                              ...updated[index],
                              location: { ...updated[index].location, hi: e.target.value },
                            };
                            setForm({ ...form, centresList: updated });
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Centre Photo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      <div className="md:col-span-2">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">Centre Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const updated = [...form.centresList];
                              updated[index] = {
                                ...updated[index],
                                file: file,
                              };
                              setForm({ ...form, centresList: updated });
                            }
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex items-center justify-center border border-dashed border-gray-200 rounded-lg h-20 overflow-hidden bg-gray-50">
                        {centre.file ? (
                          <img
                            src={URL.createObjectURL(centre.file)}
                            alt="Selected"
                            className="h-full w-full object-cover"
                          />
                        ) : centre.image ? (
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/programs/${centre.image}`}
                            alt="Current"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-gray-400">No image</span>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image & Active */}
          <div className="space-y-3">
            <div>
              <p className={`${labelClass} mb-2`}>Programme Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className={inputClass}
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active Programme
            </label>
          </div>

          {/* Actions */}
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
        <div className="space-y-3">
          {programs.map((p, index) => (
            <div
              key={p._id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="relative bg-white border border-[var(--admin-border)] rounded-2xl p-3 hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing flex items-center gap-3"
            >
              {/* Drag Handle */}
              <div className="flex-shrink-0 text-gray-400 hover:text-gray-600 px-1 cursor-grab">
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

              <div className="flex gap-3 flex-1 min-w-0 pr-24">
                {/* Image */}
                <div className="w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/programs/${p.image}`}
                    alt={p.name?.en}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 relative">
                  <div className="absolute top-0 right-0 text-right flex flex-col items-end gap-1">
                    {/* Status Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(p);
                      }}
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                        p.active
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </button>
                    
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1">
                      {p.category?.en}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug pr-20">
                      {p.name?.en}
                    </h3>
                    <p className="text-xs text-[var(--admin-muted)] mt-0.5 leading-snug pr-20">
                      {p.name?.hi}
                    </p>
                  </div>

                  <div className="mt-1.5 space-y-1 pr-20">
                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-1">
                      {p.description?.en}
                    </p>
                    
                    {/* Info Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {p.location?.en && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          📍 {p.location.en}
                        </span>
                      )}
                      {p.centresList && p.centresList.length > 0 ? (
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                          🏢 {p.centresList.length} Centres (with photo)
                        </span>
                      ) : p.centres?.en ? (
                        <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                          🏢 Centres: {p.centres.en}
                        </span>
                      ) : null}
                      {p.longDescription?.en && (
                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                          📝 Long desc
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(p);
                  }}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(p._id);
                  }}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
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

export default Programs;
