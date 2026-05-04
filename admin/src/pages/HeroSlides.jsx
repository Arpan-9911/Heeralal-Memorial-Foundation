import React, { useState } from "react";

const mockSlides = [
  { id: 1, image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=400", titleEn: "Build Something Amazing", titleHi: "एक अद्भुत बनायें", subtitleEn: "Create modern, scalable web experiences", subtitleHi: "मॉडर्न, स्केलेबल वेब अनुभव", active: true },
  { id: 2, image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=400", titleEn: "The Future of Web Development", titleHi: "वेब डेवलपमेंट के भविष्य", subtitleEn: "Innovating for a better tomorrow", subtitleHi: "बेहतर कल के लिए नवाचार", active: true },
  { id: 3, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400", titleEn: "Sustainable Social Change", titleHi: "स्वतंत्र सामाजिक बदलाव", subtitleEn: "Building resilient communities across India", subtitleHi: "भारत भर में लचीले समुदाय बनाना", active: false },
];

const HeroSlides = () => {
  const [slides, setSlides] = useState(mockSlides);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titleEn: "", titleHi: "", subtitleEn: "", subtitleHi: "", image: "", active: true });

  const resetForm = () => {
    setForm({ titleEn: "", titleHi: "", subtitleEn: "", subtitleHi: "", image: "", active: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (slide) => {
    setForm(slide);
    setEditing(slide.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      setSlides((prev) => prev.map((s) => (s.id === editing ? { ...form, id: editing } : s)));
    } else {
      setSlides((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleActive = (id) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">{slides.length} slide{slides.length !== 1 && "s"} configured</p>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)] transition-colors"
        >
          + Add Slide
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit Slide" : "Add New Slide"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Title (English)</label>
              <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Title (Hindi)</label>
              <input value={form.titleHi} onChange={(e) => setForm({ ...form, titleHi: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Subtitle (English)</label>
              <input value={form.subtitleEn} onChange={(e) => setForm({ ...form, subtitleEn: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--admin-muted)]">Subtitle (Hindi)</label>
              <input value={form.subtitleHi} onChange={(e) => setForm({ ...form, subtitleHi: e.target.value })} className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--admin-muted)]">Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black hover:bg-[var(--admin-accent-dark)] hover:text-white transition-colors">
              {editing ? "Update Slide" : "Add Slide"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((slide, idx) => (
          <div key={slide.id} className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${slide.active ? "border-[var(--admin-border)]" : "border-dashed border-gray-300 opacity-60"}`}>
            <div className="relative h-40">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-bold truncate">{slide.titleEn}</p>
                <p className="text-gray-300 text-xs truncate">{slide.subtitleEn}</p>
              </div>
              <span className="absolute top-2 left-2 text-[10px] font-bold bg-black/50 text-white px-2 py-0.5 rounded">
                #{idx + 1}
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <button
                onClick={() => toggleActive(slide.id)}
                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  slide.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {slide.active ? "Active" : "Inactive"}
              </button>
              <div className="flex gap-1.5">
                <button onClick={() => handleEdit(slide)} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
                <button onClick={() => handleDelete(slide.id)} className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlides;
