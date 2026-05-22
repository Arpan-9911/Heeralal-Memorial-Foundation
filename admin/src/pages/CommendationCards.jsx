import React, { useEffect, useState, useRef } from "react";

import {
  getCommendationCards,
  createCommendationCard,
  updateCommendationCard,
  deleteCommendationCard,
  reorderCommendationCards,
} from "../api/commendationCard.api";
import { toast } from "sonner";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const initialForm = {
  titleEn: "",
  titleHi: "",
  contentEn: "",
  contentHi: "",
  byNameEn: "",
  byNameHi: "",
  byDesignationEn: "",
  byDesignationHi: "",
  leftPhoto: null,
  rightPhoto: null,
  active: true,
};

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-[var(--admin-border)] rounded-xl outline-none focus:border-[var(--admin-accent)]";

const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wide";

const CommendationCards = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Drag state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await getCommendationCards();
      setItems(data?.cards || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
    setShowForm(false);
  };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const reordered = [...items];
    const [dragged] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, dragged);

    setItems(reordered);

    try {
      await reorderCommendationCards(reordered.map((c) => c._id));
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save order");
      fetchCards();
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleEdit = (card) => {
    setForm({
      titleEn: card.title?.en || "",
      titleHi: card.title?.hi || "",
      contentEn: card.content?.en || "",
      contentHi: card.content?.hi || "",
      byNameEn: card.byName?.en || "",
      byNameHi: card.byName?.hi || "",
      byDesignationEn: card.byDesignation?.en || "",
      byDesignationHi: card.byDesignation?.hi || "",
      leftPhoto: null,
      rightPhoto: null,
      active: card.active ?? true,
    });
    setEditing(card._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.titleEn) {
        alert("Please fill the title (English)");
        return;
      }

      setSaving(true);

      const formData = new FormData();
      formData.append("titleEn", form.titleEn);
      formData.append("titleHi", form.titleHi);
      formData.append("contentEn", form.contentEn);
      formData.append("contentHi", form.contentHi);
      formData.append("byNameEn", form.byNameEn);
      formData.append("byNameHi", form.byNameHi);
      formData.append("byDesignationEn", form.byDesignationEn);
      formData.append("byDesignationHi", form.byDesignationHi);
      formData.append("active", form.active);

      if (form.leftPhoto) formData.append("leftPhoto", form.leftPhoto);
      if (form.rightPhoto) formData.append("rightPhoto", form.rightPhoto);

      if (editing) {
        const data = await updateCommendationCard(editing, formData);
        setItems((prev) =>
          prev.map((c) => (c._id === editing ? data.card : c))
        );
      } else {
        const data = await createCommendationCard(formData);
        setItems((prev) => [data.card, ...prev]);
      }

      resetForm();
      toast.success(`Commendation ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this commendation card?")) return;

    try {
      await deleteCommendationCard(id);
      setItems((prev) => prev.filter((c) => c._id !== id));
      toast.success("Commendation deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const toggleStatus = async (card) => {
    try {
      const formData = new FormData();
      formData.append("titleEn", card.title?.en || "");
      formData.append("titleHi", card.title?.hi || "");
      formData.append("contentEn", card.content?.en || "");
      formData.append("contentHi", card.content?.hi || "");
      formData.append("byNameEn", card.byName?.en || "");
      formData.append("byNameHi", card.byName?.hi || "");
      formData.append("byDesignationEn", card.byDesignation?.en || "");
      formData.append("byDesignationHi", card.byDesignation?.hi || "");
      formData.append("active", !card.active);

      const data = await updateCommendationCard(card._id, formData);
      setItems((prev) =>
        prev.map((c) => (c._id === card._id ? data.card : c))
      );
      toast.success("Status updated");
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
          <h2 className="text-lg font-bold text-gray-900">Commendation Cards</h2>
          <p className="text-xs text-[var(--admin-muted)]">
            {items.length} total commendation{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--admin-maroon)] text-white hover:opacity-90"
        >
          + Add Commendation
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-5 space-y-5">
          <h3 className="text-sm font-bold">
            {editing ? "Edit Commendation" : "Add Commendation"}
          </h3>

          {/* Title */}
          <div>
            <p className={`${labelClass} mb-2`}>Title</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Title English"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Title Hindi"
                value={form.titleHi}
                onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className={`${labelClass} mb-2`}>Content / Message</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={4}
                placeholder="Content English"
                value={form.contentEn}
                onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <textarea
                rows={4}
                placeholder="Content Hindi"
                value={form.contentHi}
                onChange={(e) => setForm({ ...form, contentHi: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* By Name */}
          <div>
            <p className={`${labelClass} mb-2`}>By (Name)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Name English"
                value={form.byNameEn}
                onChange={(e) => setForm({ ...form, byNameEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Name Hindi"
                value={form.byNameHi}
                onChange={(e) => setForm({ ...form, byNameHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* By Designation */}
          <div>
            <p className={`${labelClass} mb-2`}>By (Designation)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Designation English"
                value={form.byDesignationEn}
                onChange={(e) => setForm({ ...form, byDesignationEn: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Designation Hindi"
                value={form.byDesignationHi}
                onChange={(e) => setForm({ ...form, byDesignationHi: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={`${labelClass} mb-2`}>Left Photo (Person)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, leftPhoto: e.target.files[0] })}
                className={inputClass}
              />
            </div>
            <div>
              <p className={`${labelClass} mb-2`}>Right Photo (Letter / Certificate)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, rightPhoto: e.target.files[0] })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Active */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Active
          </label>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--admin-accent)] text-white hover:opacity-90 transition-all"
            >
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={resetForm}
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
          Loading commendation cards...
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="bg-white rounded-2xl border p-10 text-center text-sm text-gray-500">
          No commendation cards found
        </div>
      )}

      {/* List — Draggable Rows */}
      {!loading && items.length > 0 && (
        <div className="space-y-3">
          {items.map((card, index) => (
            <div
              key={card._id}
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

              <div className="flex gap-3 flex-1 min-w-0 pr-28">
                {/* Left Photo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  {card.leftPhoto ? (
                    <img
                      src={`${BACKEND}/uploads/commendation-cards/${card.leftPhoto}`}
                      alt="Left"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-lg">
                      👤
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 relative">
                  <div className="absolute top-0 right-0 text-right flex flex-col items-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(card);
                      }}
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                        card.active
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {card.active ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug pr-20">
                      {card.title?.en}
                    </h3>
                    <p className="text-xs text-[var(--admin-muted)] mt-0.5 leading-snug pr-20">
                      {card.title?.hi}
                    </p>
                  </div>

                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-1">
                      {card.content?.en}
                    </p>

                    {card.byName?.en && (
                      <p className="text-[11px] text-[var(--admin-maroon)] font-semibold">
                        — {card.byName.en}
                        {card.byDesignation?.en && (
                          <span className="text-gray-400 font-normal">
                            , {card.byDesignation.en}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Photo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  {card.rightPhoto ? (
                    <img
                      src={`${BACKEND}/uploads/commendation-cards/${card.rightPhoto}`}
                      alt="Right"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-lg">
                      📜
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(card);
                  }}
                  className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(card._id);
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

export default CommendationCards;
