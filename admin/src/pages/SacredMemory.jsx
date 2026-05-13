import React, { useEffect, useState } from "react";
import { getSacredMemory, updateSacredMemory } from "../api/sacredMemory.api";
import { toast } from "sonner";

const SacredMemory = () => {
  const [form, setForm] = useState({
    headingEn: "",
    headingHi: "",
    lifespanEn: "",
    lifespanHi: "",
    descriptionEn: "",
    descriptionHi: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMemory();
  }, []);

  const fetchMemory = async () => {
    try {
      setLoading(true);
      const res = await getSacredMemory();
      if (res.memory) {
        setForm({
          headingEn: res.memory.heading?.en || "",
          headingHi: res.memory.heading?.hi || "",
          lifespanEn: res.memory.lifespan?.en || "",
          lifespanHi: res.memory.lifespan?.hi || "",
          descriptionEn: res.memory.description?.en || "",
          descriptionHi: res.memory.description?.hi || "",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSacredMemory(form);
      toast.success("Updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)]";

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">In Loving Memory</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Update the text content for the memorial section on the homepage.
        </p>
      </div>

      <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heading */}
          <div>
            <label className="text-sm font-bold block mb-2">Heading (EN)</label>
            <input
              className={inp}
              value={form.headingEn}
              onChange={(e) => setForm({ ...form, headingEn: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">Heading (HI)</label>
            <input
              className={inp}
              value={form.headingHi}
              onChange={(e) => setForm({ ...form, headingHi: e.target.value })}
            />
          </div>

          {/* Lifespan */}
          <div>
            <label className="text-sm font-bold block mb-2">Lifespan / Years (EN)</label>
            <input
              className={inp}
              value={form.lifespanEn}
              onChange={(e) => setForm({ ...form, lifespanEn: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">Lifespan / Years (HI)</label>
            <input
              className={inp}
              value={form.lifespanHi}
              onChange={(e) => setForm({ ...form, lifespanHi: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-bold block mb-2">Description / Message (EN)</label>
            <textarea
              className={inp}
              rows={4}
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-bold block mb-2">Description / Message (HI)</label>
            <textarea
              className={inp}
              rows={4}
              value={form.descriptionHi}
              onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default SacredMemory;
