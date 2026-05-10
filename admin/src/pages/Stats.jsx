import React, { useEffect, useState } from "react";

import {
  getStatsData,
  createStat,
  updateStat,
  deleteStat,
} from "../api/stats.api";

const Stats = () => {
  const [stats, setStats] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const empty = {
    icon: "📊",
    value: "",
    labelEn: "",
    labelHi: "",
  };

  const [form, setForm] = useState(empty);

  const inp =
    "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  // FETCH
  const fetchStats = async () => {
    try {
      setLoading(true);

      const data = await getStatsData();

      setStats(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
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
      setSaving(true);

      const payload = {
        icon: form.icon,
        value: form.value,
        labelEn: form.labelEn,
        labelHi: form.labelHi,
      };

      // UPDATE
      if (editing) {
        const updated = await updateStat(editing, payload);

        setStats((prev) => prev.map((i) => (i._id === editing ? updated : i)));
      }

      // CREATE
      else {
        const created = await createStat(payload);

        setStats((prev) => [created, ...prev]);
      }

      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const del = async (id) => {
    const confirmDelete = window.confirm("Delete this stat?");

    if (!confirmDelete) return;

    try {
      await deleteStat(id);

      setStats((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">
          These stats appear on both Home and Achievements pages.
        </p>

        <button
          onClick={() => {
            reset();

            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Stat
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Stat</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Value
              </label>

              <input
                value={form.value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    value: e.target.value,
                  })
                }
                placeholder="15,000+"
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Label (EN)
              </label>

              <input
                value={form.labelEn}
                onChange={(e) =>
                  setForm({
                    ...form,
                    labelEn: e.target.value,
                  })
                }
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Label (HI)
              </label>

              <input
                value={form.labelHi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    labelHi: e.target.value,
                  })
                }
                className={inp}
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

      {/* STATS */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-xl border border-[var(--admin-border)] p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{s.icon}</div>

              <h3 className="text-2xl font-bold">{s.value}</h3>

              <p className="text-xs text-[var(--admin-muted)] font-semibold mt-1">
                {s.label?.en}
              </p>

              <p className="text-[11px] text-[var(--admin-muted)]">
                {s.label?.hi}
              </p>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <button
                  onClick={() => {
                    setEditing(s._id);

                    setShowForm(true);

                    setForm({
                      icon: s.icon,
                      value: s.value,
                      labelEn: s.label?.en,
                      labelHi: s.label?.hi,
                    });
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => del(s._id)}
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

export default Stats;
