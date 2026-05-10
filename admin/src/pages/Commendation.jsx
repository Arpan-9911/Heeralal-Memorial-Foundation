import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getCommendation,
  updateCommendation,
} from "../api/commendation.api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const Commendation = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    messageTitleEn: "",
    messageTitleHi: "",
    messageBodyEn: "",
    messageBodyHi: "",
    directorNameEn: "",
    directorNameHi: "",
    directorPostEn: "",
    directorPostHi: "",
    sectionSubtitleEn: "",
    sectionSubtitleHi: "",
    sectionTitleEn: "",
    sectionTitleHi: "",
  });

  const [directorPhotoFile, setDirectorPhotoFile] = useState(null);
  const [letterImageFile, setLetterImageFile] = useState(null);
  const [existingDirectorPhoto, setExistingDirectorPhoto] = useState("");
  const [existingLetterImage, setExistingLetterImage] = useState("");

  /* ───────────────── FETCH ───────────────── */

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getCommendation();
      const c = res.commendation;

      if (c) {
        setForm({
          messageTitleEn: c.messageTitle?.en || "",
          messageTitleHi: c.messageTitle?.hi || "",
          messageBodyEn: c.messageBody?.en || "",
          messageBodyHi: c.messageBody?.hi || "",
          directorNameEn: c.directorName?.en || "",
          directorNameHi: c.directorName?.hi || "",
          directorPostEn: c.directorPost?.en || "",
          directorPostHi: c.directorPost?.hi || "",
          sectionSubtitleEn: c.sectionSubtitle?.en || "",
          sectionSubtitleHi: c.sectionSubtitle?.hi || "",
          sectionTitleEn: c.sectionTitle?.en || "",
          sectionTitleHi: c.sectionTitle?.hi || "",
        });

        setExistingDirectorPhoto(c.directorPhoto || "");
        setExistingLetterImage(c.letterImage || "");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ───────────────── SAVE ───────────────── */

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      // Append all text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append file uploads
      if (directorPhotoFile) {
        formData.append("directorPhoto", directorPhotoFile);
      }
      if (letterImageFile) {
        formData.append("letterImage", letterImageFile);
      }

      await updateCommendation(formData);

      toast.success("Commendation section updated!");

      // Reset file inputs and re-fetch
      setDirectorPhotoFile(null);
      setLetterImageFile(null);
      await fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  /* ───────────────── INPUT HELPER ───────────────── */

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)] text-sm";

  const labelClass = "text-sm font-medium block mb-1.5";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[var(--admin-muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Commendation Section</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Manage the combined Formal Commendation & Message of Hope section on
          the homepage
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6 space-y-6">
        {/* SECTION HEADERS */}
        <div>
          <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">
            📌 Section Headings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Section Subtitle (English)</label>
              <input
                value={form.sectionSubtitleEn}
                onChange={(e) =>
                  setForm({ ...form, sectionSubtitleEn: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. Institutional Patronage"
              />
            </div>

            <div>
              <label className={labelClass}>Section Subtitle (Hindi)</label>
              <input
                value={form.sectionSubtitleHi}
                onChange={(e) =>
                  setForm({ ...form, sectionSubtitleHi: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. संस्थागत संरक्षण"
              />
            </div>

            <div>
              <label className={labelClass}>Section Title (English)</label>
              <input
                value={form.sectionTitleEn}
                onChange={(e) =>
                  setForm({ ...form, sectionTitleEn: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. Formal Commendation"
              />
            </div>

            <div>
              <label className={labelClass}>Section Title (Hindi)</label>
              <input
                value={form.sectionTitleHi}
                onChange={(e) =>
                  setForm({ ...form, sectionTitleHi: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. औपचारिक प्रशंसा"
              />
            </div>
          </div>
        </div>

        <hr className="border-[var(--admin-border)]" />

        {/* MESSAGE OF HOPE */}
        <div>
          <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">
            💬 Message of Hope
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Message Title (English)</label>
              <input
                value={form.messageTitleEn}
                onChange={(e) =>
                  setForm({ ...form, messageTitleEn: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. Message of Hope"
              />
            </div>

            <div>
              <label className={labelClass}>Message Title (Hindi)</label>
              <input
                value={form.messageTitleHi}
                onChange={(e) =>
                  setForm({ ...form, messageTitleHi: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. आशा का संदेश"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Message Body (English)</label>
              <textarea
                rows={4}
                value={form.messageBodyEn}
                onChange={(e) =>
                  setForm({ ...form, messageBodyEn: e.target.value })
                }
                className={inputClass}
                placeholder="Inspirational message in English..."
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Message Body (Hindi)</label>
              <textarea
                rows={4}
                value={form.messageBodyHi}
                onChange={(e) =>
                  setForm({ ...form, messageBodyHi: e.target.value })
                }
                className={inputClass}
                placeholder="Hindi में प्रेरणादायक संदेश..."
              />
            </div>
          </div>
        </div>

        <hr className="border-[var(--admin-border)]" />

        {/* DIRECTOR INFO */}
        <div>
          <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">
            👤 Director Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Director Name (English)</label>
              <input
                value={form.directorNameEn}
                onChange={(e) =>
                  setForm({ ...form, directorNameEn: e.target.value })
                }
                className={inputClass}
                placeholder="Dr. Arpan Kumar"
              />
            </div>

            <div>
              <label className={labelClass}>Director Name (Hindi)</label>
              <input
                value={form.directorNameHi}
                onChange={(e) =>
                  setForm({ ...form, directorNameHi: e.target.value })
                }
                className={inputClass}
                placeholder="डॉ. अर्पन कुमार"
              />
            </div>

            <div>
              <label className={labelClass}>Director Post (English)</label>
              <input
                value={form.directorPostEn}
                onChange={(e) =>
                  setForm({ ...form, directorPostEn: e.target.value })
                }
                className={inputClass}
                placeholder="Director, Heeralal Memorial Foundation"
              />
            </div>

            <div>
              <label className={labelClass}>Director Post (Hindi)</label>
              <input
                value={form.directorPostHi}
                onChange={(e) =>
                  setForm({ ...form, directorPostHi: e.target.value })
                }
                className={inputClass}
                placeholder="निदेशक, हीरालाल मेमोरियल फाउंडेशन"
              />
            </div>
          </div>
        </div>

        <hr className="border-[var(--admin-border)]" />

        {/* IMAGE UPLOADS */}
        <div>
          <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">
            🖼️ Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Director Photo */}
            <div>
              <label className={labelClass}>Director Photo</label>

              {existingDirectorPhoto && (
                <div className="mb-3">
                  <img
                    src={`${BACKEND}/uploads/commendation/${existingDirectorPhoto}`}
                    alt="Director"
                    className="w-32 h-32 rounded-full object-cover border-2 border-[var(--admin-accent)]"
                  />
                  <p className="text-xs text-[var(--admin-muted)] mt-1">
                    Current photo
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setDirectorPhotoFile(e.target.files?.[0] || null)
                }
                className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 text-sm"
              />
            </div>

            {/* Letter Image */}
            <div>
              <label className={labelClass}>Commendation Letter Image</label>

              {existingLetterImage && (
                <div className="mb-3">
                  <img
                    src={`${BACKEND}/uploads/commendation/${existingLetterImage}`}
                    alt="Letter"
                    className="w-48 h-auto rounded-lg border border-[var(--admin-border)]"
                  />
                  <p className="text-xs text-[var(--admin-muted)] mt-1">
                    Current letter
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setLetterImageFile(e.target.files?.[0] || null)
                }
                className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        <hr className="border-[var(--admin-border)]" />

        {/* SAVE BUTTON */}
        <div className="flex gap-3">
          <button
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-dark)] hover:text-white transition-all"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={fetchData}
            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commendation;
