import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getJoinRequests,
  updateJoinRequestStatus,
  deleteJoinRequest,
} from "../api/joinRequest.api";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const roleLabels = {
  volunteer: "🤝 Volunteer",
  intern: "🎓 Intern",
  fieldworker: "🌾 Field Worker",
  donor: "💰 Donor",
  partner: "🏢 CSR / Partner",
  other: "✨ Other",
};

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  /* ───────────────── FETCH ───────────────── */

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getJoinRequests();
      setRequests(res.requests || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ───────────────── UPDATE STATUS ───────────────── */

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJoinRequestStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchRequests();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  /* ───────────────── DELETE ───────────────── */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteJoinRequest(id);
      toast.success("Request deleted");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  /* ───────────────── FILTER ───────────────── */

  const filtered =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    reviewed: requests.filter((r) => r.status === "reviewed").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Join Us — Applications</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Review and manage volunteer, intern, and partnership applications
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "reviewed", "accepted", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? "bg-[var(--admin-maroon)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <p className="text-[var(--admin-muted)]">Loading...</p>
        </div>
      )}

      {/* CARDS */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--admin-muted)]">
          No applications found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-[var(--admin-border)] rounded-2xl p-5 space-y-3"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm">{req.fullName}</h3>
                <p className="text-xs text-[var(--admin-muted)]">{req.email}</p>
                <p className="text-xs text-[var(--admin-muted)]">{req.phone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  statusColors[req.status] || "bg-gray-100 text-gray-500"
                }`}
              >
                {req.status}
              </span>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--admin-maroon)] bg-[var(--admin-accent-light)] px-3 py-1 rounded-full">
                {roleLabels[req.role] || req.role}
              </span>
              <span className="text-[10px] text-[var(--admin-muted)]">
                {new Date(req.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Message */}
            {req.message && (
              <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 italic">
                "{req.message}"
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--admin-border)]">
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req._id, e.target.value)}
                className="text-xs border border-[var(--admin-border)] rounded-lg px-3 py-1.5 outline-none focus:border-[var(--admin-accent)]"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => handleDelete(req._id)}
                className="ml-auto px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinRequests;
