import React, { useState } from "react";

const mockSubmissions = [
  { id: 1, name: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 98765 43210", subject: "Volunteer Registration", message: "I would like to volunteer for the upcoming education drive in rural Delhi. I have experience in teaching mathematics and science to underprivileged children.", status: "unread", date: "2026-05-03T10:30:00" },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 87654 32109", subject: "CSR Partnership", message: "Our company is interested in partnering with HLMF for our CSR initiative focused on women empowerment. Could we schedule a meeting?", status: "read", date: "2026-05-02T14:15:00" },
  { id: 3, name: "Amit Singh", email: "amit.singh@example.com", phone: "+91 76543 21098", subject: "Donation Query", message: "I want to donate ₹50,000 towards the Vidya Jyoti programme. Can you share the bank details and confirm 80G certificate availability?", status: "resolved", date: "2026-05-01T09:45:00" },
  { id: 4, name: "Sneha Patel", email: "sneha.p@example.com", phone: "", subject: "General Inquiry", message: "I read about your foundation in the newspaper. I would like to know more about the healthcare initiatives in South Delhi.", status: "unread", date: "2026-04-30T16:20:00" },
  { id: 5, name: "Dr. Ramesh Kumar", email: "dr.ramesh@hospital.in", phone: "+91 65432 10987", subject: "CSR Partnership", message: "We are a chain of hospitals and wish to collaborate on health camps. Please share your programme proposal.", status: "read", date: "2026-04-28T11:00:00" },
  { id: 6, name: "Anjali Mehta", email: "anjali.mehta@gmail.com", phone: "+91 54321 09876", subject: "Complaint / Grievance", message: "I made a donation last month but haven't received the receipt yet. My transaction ID is TXN2026042501.", status: "unread", date: "2026-04-25T08:30:00" },
];

const statusConfig = {
  unread: { label: "Unread", bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  read: { label: "Read", bg: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  resolved: { label: "Resolved", bg: "bg-green-100 text-green-700", dot: "bg-green-500" },
};

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((s) => {
    const matchFilter = filter === "all" || s.status === filter;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selected?.id === id) {
      setSelected({ ...selected, status: newStatus });
    }
  };

  const deleteSubmission = (id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)] focus:ring-2 focus:ring-[var(--admin-accent-light)] transition-all"
          />
        </div>
        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap">
          {["all", "unread", "read", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-[var(--admin-maroon)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f} {f !== "all" && `(${submissions.filter((s) => s.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--admin-border)] text-xs text-[var(--admin-muted)] font-semibold">
            {filtered.length} submission{filtered.length !== 1 && "s"}
          </div>
          <div className="divide-y divide-[var(--admin-border)] max-h-[65vh] overflow-y-auto">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  if (item.status === "unread") updateStatus(item.id, "read");
                }}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  selected?.id === item.id
                    ? "bg-[var(--admin-accent-light)] border-l-3 border-l-[var(--admin-accent)]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.status === "unread" && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                  <p className={`text-sm truncate ${item.status === "unread" ? "font-bold" : "font-medium"}`}>
                    {item.name}
                  </p>
                </div>
                <p className="text-xs text-[var(--admin-muted)] truncate">{item.subject}</p>
                <p className="text-[11px] text-[var(--admin-muted)] mt-1">{formatDate(item.date)}</p>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-[var(--admin-muted)]">
                No submissions found.
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[var(--admin-border)]">
          {selected ? (
            <div>
              {/* Detail Header */}
              <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold">{selected.name}</h3>
                  <p className="text-xs text-[var(--admin-muted)]">{selected.email}</p>
                  {selected.phone && (
                    <p className="text-xs text-[var(--admin-muted)]">{selected.phone}</p>
                  )}
                </div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusConfig[selected.status].bg}`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>

              {/* Subject + Message */}
              <div className="px-5 py-5">
                <p className="text-xs text-[var(--admin-muted)] uppercase tracking-wider font-semibold mb-1">Subject</p>
                <p className="text-sm font-semibold mb-4">{selected.subject}</p>

                <p className="text-xs text-[var(--admin-muted)] uppercase tracking-wider font-semibold mb-1">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 border border-[var(--admin-border)]">
                  {selected.message}
                </p>

                <p className="text-[11px] text-[var(--admin-muted)] mt-3">
                  Received: {formatDate(selected.date)}
                </p>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-[var(--admin-border)] flex items-center gap-2 flex-wrap">
                {selected.status !== "resolved" && (
                  <button
                    onClick={() => updateStatus(selected.id, "resolved")}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    ✓ Mark Resolved
                  </button>
                )}
                {selected.status === "resolved" && (
                  <button
                    onClick={() => updateStatus(selected.id, "read")}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    Reopen
                  </button>
                )}
                <button
                  onClick={() => deleteSubmission(selected.id)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--admin-border)] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 text-sm text-[var(--admin-muted)]">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
