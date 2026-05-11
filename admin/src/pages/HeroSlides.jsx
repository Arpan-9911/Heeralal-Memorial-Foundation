import React, { useEffect, useState } from "react";

import {
  createSlide,
  deleteSlide,
  getSlides,
  updateSlide,
} from "../api/hero.api";
import { toast } from "sonner";

const HeroSlides = () => {
  const [slides, setSlides] = useState([]);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: {
      en: "",
      hi: "",
    },

    subtitle: {
      en: "",
      hi: "",
    },

    image: null,

    active: true,
  });

  /* ───────────────── FETCH ───────────────── */

  const fetchSlides = async () => {
    try {
      const res = await getSlides();

      setSlides(res.slides || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  /* ───────────────── RESET ───────────────── */

  const resetForm = () => {
    setForm({
      title: {
        en: "",
        hi: "",
      },

      subtitle: {
        en: "",
        hi: "",
      },

      image: null,

      active: true,
    });

    setEditing(null);

    setShowForm(false);
  };

  /* ───────────────── EDIT ───────────────── */

  const handleEdit = (slide) => {
    setEditing(slide._id);

    setShowForm(true);

    setForm({
      title: {
        en: slide.title?.en || "",

        hi: slide.title?.hi || "",
      },

      subtitle: {
        en: slide.subtitle?.en || "",

        hi: slide.subtitle?.hi || "",
      },

      image: null,

      active: slide.active,
    });
  };

  /* ───────────────── SAVE ───────────────── */

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("titleEn", form.title.en);

      formData.append("titleHi", form.title.hi);

      formData.append("subtitleEn", form.subtitle.en);

      formData.append("subtitleHi", form.subtitle.hi);

      formData.append("active", form.active);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        await updateSlide(editing, formData);
      } else {
        await createSlide(formData);
      }

      await fetchSlides();

      resetForm();
      toast.success(`Slide ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to save slide");
    } finally {
      setLoading(false);
    }
  };

  /* ───────────────── DELETE ───────────────── */

  const handleDelete = async (id) => {
    try {
      await deleteSlide(id);

      fetchSlides();
      toast.success("Slide deleted");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete slide");
    }
  };

  /* ───────────────── ACTIVE ───────────────── */

  const toggleActive = async (slide) => {
    try {
      const formData = new FormData();

      formData.append("titleEn", slide.title?.en || "");

      formData.append("titleHi", slide.title?.hi || "");

      formData.append("subtitleEn", slide.subtitle?.en || "");

      formData.append("subtitleHi", slide.subtitle?.hi || "");

      formData.append("active", !slide.active);

      await updateSlide(slide._id, formData);

      fetchSlides();
      toast.success("Slide updated");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update slide");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Hero Slides</h1>

          <p className="text-sm text-[var(--admin-muted)] mt-1">
            Manage homepage hero section
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();

            setShowForm(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-[var(--admin-maroon)] text-white text-sm font-semibold hover:opacity-90"
        >
          + Add Slide
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {editing ? "Edit Slide" : "Create Slide"}
            </h2>

            <button
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* INPUTS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Title English"
              value={form.title.en}
              onChange={(e) =>
                setForm({
                  ...form,

                  title: {
                    ...form.title,

                    en: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)]"
            />

            <input
              placeholder="Title Hindi"
              value={form.title.hi}
              onChange={(e) =>
                setForm({
                  ...form,

                  title: {
                    ...form.title,

                    hi: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)]"
            />

            <input
              placeholder="Subtitle English"
              value={form.subtitle.en}
              onChange={(e) =>
                setForm({
                  ...form,

                  subtitle: {
                    ...form.subtitle,

                    en: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)]"
            />

            <input
              placeholder="Subtitle Hindi"
              value={form.subtitle.hi}
              onChange={(e) =>
                setForm({
                  ...form,

                  subtitle: {
                    ...form.subtitle,

                    hi: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)]"
            />
          </div>

          {/* FILE */}

          <div>
            <label className="text-sm font-medium block mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,

                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-dark)] hover:text-white transition-all"
            >
              {loading
                ? "Saving..."
                : editing
                  ? "Update Slide"
                  : "Create Slide"}
            </button>

            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {slides.map((slide, idx) => (
          <div
            key={slide._id}
            className={`bg-white rounded-2xl overflow-hidden border transition-all ${
              slide.active
                ? "border-[var(--admin-border)]"
                : "border-dashed border-gray-300 opacity-60"
            }`}
          >
            {/* IMAGE */}

            <div className="relative h-56">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/heroslides/${slide.image}`}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                  Slide #{idx + 1}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                {/* English */}

                <div>
                  <h3 className="text-white text-base font-bold leading-tight">
                    {slide.title?.en}
                  </h3>

                  <p className="text-gray-200 text-xs leading-relaxed">
                    {slide.subtitle?.en}
                  </p>
                </div>

                {/* Hindi */}

                <div className="mt-1">
                  <h4 className="text-white text-base font-semibold leading-tight">
                    {slide.title?.hi}
                  </h4>

                  <p className="text-gray-300 text-xs leading-relaxed">
                    {slide.subtitle?.hi}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="p-4 flex items-center justify-between">
              <button
                onClick={() => toggleActive(slide)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                  slide.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {slide.active ? "Active" : "Inactive"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(slide._id)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlides;
