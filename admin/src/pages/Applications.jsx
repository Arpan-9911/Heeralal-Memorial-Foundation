import React, { useEffect, useState } from "react";
import { getApplications, updateApplicationStatus, deleteApplication } from "../api/application.api";
import { toast } from "sonner";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const typeLabels = {
  volunteer: "Volunteer",
  skill_development: "Skill Development",
  membership: "Membership",
};

const typeColors = {
  volunteer: "bg-green-100 text-green-700",
  skill_development: "bg-blue-100 text-blue-700",
  membership: "bg-purple-100 text-purple-700",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

const Applications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const type = filter === "all" ? "" : filter;
      const res = await getApplications(type);
      setItems(res.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      const res = await updateApplicationStatus(id, status);
      setItems((prev) => prev.map((i) => (i._id === id ? res.application : i)));
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Application deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Application Forms</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          View submissions from Volunteer, Skill Development, and Membership forms
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "volunteer", "skill_development", "membership"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? "bg-[var(--admin-maroon)] text-white"
                : "bg-white border border-[var(--admin-border)]"
            }`}
          >
            {f === "all" ? "All" : typeLabels[f]}
          </button>
        ))}

        <span className="ml-auto text-xs text-[var(--admin-muted)] self-center">
          {items.length} submissions
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-sm text-gray-400">Loading...</div>
      )}

      {/* List */}
      {!loading && items.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-400">No applications found</div>
      )}

      {!loading && items.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl border border-[var(--admin-border)] overflow-hidden"
        >
          {/* Row Summary */}
          <div
            className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === item._id ? null : item._id)}
          >
            {/* Photo */}
            {item.photo ? (
              <div className="w-12 h-14 rounded border overflow-hidden flex-shrink-0">
                <img
                  src={`${BACKEND}/uploads/applications/${item.photo}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-14 rounded border bg-gray-100 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                No
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate">{item.name}</h3>
              <p className="text-xs text-[var(--admin-muted)] truncate">
                {item.mobileNo} {item.emailId ? `• ${item.emailId}` : ""}
              </p>
            </div>

            {/* Badges */}
            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${typeColors[item.formType]}`}>
              {typeLabels[item.formType]}
            </span>
            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[item.status]}`}>
              {item.status}
            </span>

            {/* Date */}
            <span className="text-[10px] text-gray-400 hidden md:block">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>

            {/* Expand icon */}
            <span className="text-gray-400 text-xs">{expanded === item._id ? "▲" : "▼"}</span>
          </div>

          {/* Expanded Details */}
          {expanded === item._id && (
            <div className="border-t border-[var(--admin-border)] px-5 py-4 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div><span className="text-gray-500 font-medium">Name:</span> <span className="text-gray-800">{item.name}</span></div>
                <div><span className="text-gray-500 font-medium">Mobile:</span> <span className="text-gray-800">{item.mobileNo}</span></div>
                <div><span className="text-gray-500 font-medium">Email:</span> <span className="text-gray-800">{item.emailId || "—"}</span></div>
                <div><span className="text-gray-500 font-medium">Aadhar:</span> <span className="text-gray-800">{item.aadharNo || "—"}</span></div>
                <div><span className="text-gray-500 font-medium">Occupation:</span> <span className="text-gray-800">{item.occupation || "—"}</span></div>
                <div><span className="text-gray-500 font-medium">Reference:</span> <span className="text-gray-800">{item.reference || "—"}</span></div>
                <div><span className="text-gray-500 font-medium">Department:</span> <span className="text-gray-800">{item.department || "—"}</span></div>
                {item.formType === "membership" && (
                  <>
                    <div><span className="text-gray-500 font-medium">D.O.B & Age:</span> <span className="text-gray-800">{item.dob || "—"}</span></div>
                    <div><span className="text-gray-500 font-medium">Membership Fees:</span> <span className="text-gray-800">{item.membershipFees || "—"}</span></div>
                  </>
                )}
                <div className="col-span-2 md:col-span-3"><span className="text-gray-500 font-medium">Address:</span> <span className="text-gray-800">{item.address || "—"}</span></div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-[10px] text-gray-500 font-semibold mr-2">Status:</span>
                {["pending", "reviewed", "accepted", "rejected"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatus(item._id, s)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg capitalize transition-all ${
                      item.status === s
                        ? statusColors[s] + " ring-2 ring-offset-1 ring-gray-300"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="ml-auto px-3 py-1 text-[10px] font-bold rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
