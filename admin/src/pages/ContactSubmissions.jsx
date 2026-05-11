import React, { useEffect, useMemo, useState } from "react";

import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../api/contact.api";
import { toast } from "sonner";

const statusConfig = {
  unread: {
    label: "Unread",
    bg: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },

  read: {
    label: "Read",
    bg: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  },

  resolved: {
    label: "Resolved",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  // ================= FETCH =================

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const data = await getContacts();

      setSubmissions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ================= FILTER =================

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchFilter = filter === "all" || s.status === filter;

      const searchText = search.toLowerCase();

      const matchSearch =
        s.name?.toLowerCase().includes(searchText) ||
        s.email?.toLowerCase().includes(searchText) ||
        s.subject?.toLowerCase().includes(searchText);

      return matchFilter && matchSearch;
    });
  }, [submissions, filter, search]);

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = await updateContactStatus(id, newStatus);

      setSubmissions((prev) => prev.map((s) => (s._id === id ? updated : s)));

      if (selected?._id === id) {
        setSelected(updated);
      }

      toast.success("Status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // ================= DELETE =================

  const deleteSubmission = async (id) => {
    const confirmDelete = window.confirm("Delete this submission?");

    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      setSubmissions((prev) => prev.filter((s) => s._id !== id));

      if (selected?._id === id) {
        setSelected(null);
      }
      toast.success("Submission deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete submission");
    }
  };

  // ================= DATE =================

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* ================= TOOLBAR ================= */}

      <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        {/* Search */}

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-[var(--admin-border)] rounded-xl outline-none focus:border-[var(--admin-accent)] focus:ring-2 focus:ring-[var(--admin-accent-light)] transition-all"
          />
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-2">
          {["all", "unread", "read", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl capitalize transition-all ${
                filter === f
                  ? "bg-[var(--admin-maroon)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}

              {f !== "all" &&
                ` (${submissions.filter((s) => s.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ================= LEFT LIST ================= */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--admin-border)] overflow-hidden">
          {/* Header */}

          <div className="px-4 py-3 border-b border-[var(--admin-border)] flex items-center justify-between">
            <p className="text-xs font-semibold text-[var(--admin-muted)]">
              {filtered.length} submission
              {filtered.length !== 1 && "s"}
            </p>

            <button
              onClick={fetchContacts}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Refresh
            </button>
          </div>

          {/* List */}

          <div className="divide-y divide-[var(--admin-border)] max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-16 text-center text-sm text-gray-400">
                Loading submissions...
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelected(item);

                    if (item.status === "unread") {
                      updateStatus(item._id, "read");
                    }
                  }}
                  className={`px-4 py-4 cursor-pointer transition-all ${
                    selected?._id === item._id
                      ? "bg-[var(--admin-accent-light)] border-l-4 border-l-[var(--admin-accent)]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {item.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}

                        <p
                          className={`text-sm truncate ${
                            item.status === "unread"
                              ? "font-bold"
                              : "font-medium"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>

                      <p className="text-xs text-[var(--admin-muted)] truncate mt-1">
                        {item.subject}
                      </p>

                      <p className="text-[11px] text-[var(--admin-muted)] mt-2">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                        statusConfig[item.status]?.bg
                      }`}
                    >
                      {statusConfig[item.status]?.label}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-sm text-gray-400">
                No submissions found
              </div>
            )}
          </div>
        </div>

        {/* ================= DETAIL ================= */}

        <div className="lg:col-span-3 bg-white rounded-2xl border border-[var(--admin-border)] overflow-hidden">
          {selected ? (
            <div>
              {/* Header */}

              <div className="px-5 py-5 border-b border-[var(--admin-border)] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selected.name}
                  </h2>

                  <p className="text-sm text-[var(--admin-muted)] mt-1">
                    {selected.email}
                  </p>

                  {selected.phone && (
                    <p className="text-sm text-[var(--admin-muted)]">
                      {selected.phone}
                    </p>
                  )}
                </div>

                <span
                  className={`text-[11px] font-bold uppercase px-3 py-1.5 rounded-full ${
                    statusConfig[selected.status]?.bg
                  }`}
                >
                  {statusConfig[selected.status]?.label}
                </span>
              </div>

              {/* Body */}

              <div className="p-5 space-y-5">
                {/* Subject */}

                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--admin-muted)] font-bold mb-2">
                    Subject
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {selected.subject}
                  </p>
                </div>

                {/* Message */}

                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--admin-muted)] font-bold mb-2">
                    Message
                  </p>

                  <div className="bg-gray-50 border border-[var(--admin-border)] rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {selected.message}
                    </p>
                  </div>
                </div>

                {/* Date */}

                <div>
                  <p className="text-[11px] text-[var(--admin-muted)]">
                    Received on {formatDate(selected.createdAt)}
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div className="px-5 py-4 border-t border-[var(--admin-border)] flex flex-wrap gap-2">
                {selected.status !== "resolved" && (
                  <button
                    onClick={() => updateStatus(selected._id, "resolved")}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all"
                  >
                    ✓ Mark Resolved
                  </button>
                )}

                {selected.status === "resolved" && (
                  <button
                    onClick={() => updateStatus(selected._id, "read")}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                  >
                    Reopen
                  </button>
                )}

                {selected.status === "read" && (
                  <button
                    onClick={() => updateStatus(selected._id, "unread")}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
                  >
                    Mark Unread
                  </button>
                )}

                <button
                  onClick={() => deleteSubmission(selected._id)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                  Delete
                </button>

                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-[var(--admin-border)] hover:bg-gray-50 transition-all"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
              <div className="text-5xl mb-4">📩</div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Submission Selected
              </h3>

              <p className="text-sm text-[var(--admin-muted)] mt-2 max-w-sm">
                Select a contact submission from the left panel to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
