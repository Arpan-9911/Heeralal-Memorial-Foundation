import React, { useEffect, useState } from "react";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../api/team.api";

const tierLabels = {
  founder: "Founder",
  leader: "Leadership",
  execution: "Execution Team",
};

const tierColors = {
  founder: "bg-amber-100 text-amber-800",

  leader: "bg-purple-100 text-purple-700",

  execution: "bg-blue-100 text-blue-700",
};

const initialForm = {
  tier: "execution",

  nameEn: "",
  nameHi: "",

  roleEn: "",
  roleHi: "",

  quoteEn: "",
  quoteHi: "",

  photo: null,
};

const TeamManagement = () => {
  const [members, setMembers] = useState([]);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialForm);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const data = await getMembers();

      setMembers(data?.members || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setForm(initialForm);

    setEditing(null);

    setShowForm(false);
  };

  const handleEdit = (member) => {
    setForm({
      tier: member.tier || "execution",

      nameEn: member.name?.en || "",

      nameHi: member.name?.hi || "",

      roleEn: member.role?.en || "",

      roleHi: member.role?.hi || "",

      quoteEn: member.quote?.en || "",

      quoteHi: member.quote?.hi || "",

      photo: null,
    });

    setEditing(member._id);

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!form.nameEn || !form.roleEn) {
        alert("Please fill required fields");

        return;
      }

      if (!editing && !form.photo) {
        alert("Please select photo");

        return;
      }

      setSaving(true);

      const formData = new FormData();

      formData.append("tier", form.tier);

      formData.append("nameEn", form.nameEn);

      formData.append("nameHi", form.nameHi);

      formData.append("roleEn", form.roleEn);

      formData.append("roleHi", form.roleHi);

      formData.append("quoteEn", form.quoteEn);

      formData.append("quoteHi", form.quoteHi);

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      if (editing) {
        const data = await updateMember(editing, formData);

        setMembers((prev) =>
          prev.map((m) => (m._id === editing ? data.member : m)),
        );
      } else {
        const data = await createMember(formData);

        setMembers((prev) => [data.member, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this member?");

    if (!confirmDelete) return;

    try {
      await deleteMember(id);

      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = members.filter((m) => filter === "all" || m.tier === filter);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {["all", "founder", "leader", "execution"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-[var(--admin-maroon)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "All" : tierLabels[f]} (
              {f === "all"
                ? members.length
                : members.filter((m) => m.tier === f).length}
              )
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            resetForm();

            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Member
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">
            {editing ? "Edit Member" : "Add Team Member"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={form.tier}
              onChange={(e) =>
                setForm({
                  ...form,
                  tier: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-lg"
            >
              <option value="founder">Founder</option>

              <option value="leader">Leadership</option>

              <option value="execution">Execution Team</option>
            </select>

            <input
              placeholder="Name English"
              value={form.nameEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  nameEn: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-lg"
            />

            <input
              placeholder="Name Hindi"
              value={form.nameHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  nameHi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Role English"
              value={form.roleEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  roleEn: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-lg"
            />

            <input
              placeholder="Role Hindi"
              value={form.roleHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  roleHi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              placeholder="Quote English"
              value={form.quoteEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  quoteEn: e.target.value,
                })
              }
              rows={2}
              className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
            />

            <textarea
              placeholder="Quote Hindi"
              value={form.quoteHi}
              onChange={(e) =>
                setForm({
                  ...form,
                  quoteHi: e.target.value,  
                })
              }
              rows={2}
              className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 text-sm border rounded-lg"
              onChange={(e) =>
                setForm({
                  ...form,
                  photo: e.target.files[0],
                })
              }
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)]"
            >
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={resetForm}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">
          Loading members...
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-xl border p-10 text-center text-sm text-gray-500">
          No team members found
        </div>
      )}

      {/* Cards */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-2xl border border-[var(--admin-border)] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Top */}
              <div className="p-5 flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--admin-accent)] flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/team/${m.photo}`}
                    alt={m.name?.en}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {/* English */}
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {m.name?.en}
                  </h3>

                  <p className="text-xs text-[var(--admin-muted)] truncate">
                    {m.role?.en}
                  </p>

                  {/* Hindi */}
                  <div className="mt-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {m.name?.hi}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {m.role?.hi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quotes */}
              {(m.quote?.en || m.quote?.hi) && (
                <div className="px-5 pb-4 space-y-3">
                  {m.quote?.en && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                        English Quote
                      </p>

                      <p className="text-xs italic text-gray-600 leading-relaxed">
                        “{m.quote.en}”
                      </p>
                    </div>
                  )}

                  {m.quote?.hi && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                        Hindi Quote
                      </p>

                      <p className="text-xs italic text-gray-600 leading-relaxed">
                        “{m.quote.hi}”
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="px-5 py-3 border-t border-[var(--admin-border)] flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${tierColors[m.tier]}`}
                >
                  {tierLabels[m.tier]}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(m._id)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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

export default TeamManagement;
