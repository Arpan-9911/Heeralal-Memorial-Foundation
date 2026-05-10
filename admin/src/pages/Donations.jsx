import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getDonateConfig,
  updateDonateConfig,
  getDonations,
  updateDonationStatus,
  deleteDonation,
} from "../api/donation.api";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  verified: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const paymentModeLabels = {
  upi: "💳 UPI",
  bank_transfer: "🏦 Bank Transfer",
  other: "📋 Other",
};

const Donations = () => {
  const [tab, setTab] = useState("config"); // "config" | "submissions"

  /* ───────────── CONFIG STATE ───────────── */
  const [config, setConfig] = useState({
    upiId: "",
    accountName: "",
    bankName: "",
    accountNo: "",
    ifscCode: "",
    branch: "",
  });
  const [existingQr, setExistingQr] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [savingConfig, setSavingConfig] = useState(false);

  /* ───────────── SUBMISSIONS STATE ───────────── */
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [filter, setFilter] = useState("all");

  /* ───────────── FETCH ───────────── */

  const fetchConfig = async () => {
    try {
      const res = await getDonateConfig();
      const c = res.config;
      if (c) {
        setConfig({
          upiId: c.upiId || "",
          accountName: c.accountName || "",
          bankName: c.bankName || "",
          accountNo: c.accountNo || "",
          ifscCode: c.ifscCode || "",
          branch: c.branch || "",
        });
        setExistingQr(c.qrImage || "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDonations = async () => {
    try {
      setLoadingDonations(true);
      const res = await getDonations();
      setDonations(res.donations || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingDonations(false);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchDonations();
  }, []);

  /* ───────────── SAVE CONFIG ───────────── */

  const handleSaveConfig = async () => {
    try {
      setSavingConfig(true);
      const formData = new FormData();
      Object.entries(config).forEach(([k, v]) => formData.append(k, v));
      if (qrFile) formData.append("qrImage", qrFile);
      await updateDonateConfig(formData);
      setQrFile(null);
      toast.success("Payment settings updated!");
      await fetchConfig();
    } catch (err) {
      toast.error("Failed to save config");
    } finally {
      setSavingConfig(false);
    }
  };

  /* ───────────── SUBMISSIONS ACTIONS ───────────── */

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDonationStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchDonations();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation record?")) return;
    try {
      await deleteDonation(id);
      toast.success("Deleted");
      fetchDonations();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  /* ───────────── FILTER ───────────── */

  const filtered =
    filter === "all" ? donations : donations.filter((d) => d.status === filter);

  const counts = {
    all: donations.length,
    pending: donations.filter((d) => d.status === "pending").length,
    verified: donations.filter((d) => d.status === "verified").length,
    rejected: donations.filter((d) => d.status === "rejected").length,
  };

  const totalVerified = donations
    .filter((d) => d.status === "verified")
    .reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--admin-border)] outline-none focus:border-[var(--admin-accent)] text-sm";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Donations</h1>
        <p className="text-sm text-[var(--admin-muted)] mt-1">
          Manage payment settings, QR code, and view donor submissions
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("config")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "config"
              ? "bg-[var(--admin-maroon)] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ⚙️ Payment Settings
        </button>
        <button
          onClick={() => setTab("submissions")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "submissions"
              ? "bg-[var(--admin-maroon)] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          📋 Donor Submissions ({donations.length})
        </button>
      </div>

      {/* ═══════════ CONFIG TAB ═══════════ */}
      {tab === "config" && (
        <div className="bg-white border border-[var(--admin-border)] rounded-2xl p-6 space-y-6">
          {/* QR Code */}
          <div>
            <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">📱 QR Code</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {existingQr && (
                <div>
                  <img
                    src={`${BACKEND}/uploads/donations/${existingQr}`}
                    alt="QR Code"
                    className="w-40 h-40 object-contain border-2 border-[var(--admin-accent)] rounded-xl"
                  />
                  <p className="text-xs text-[var(--admin-muted)] mt-1">Current QR</p>
                </div>
              )}
              <div className="flex-1">
                <label className="text-sm font-medium block mb-1.5">Upload New QR Code</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setQrFile(e.target.files?.[0] || null)}
                  className="w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 text-sm"
                />
                <div className="mt-3">
                  <label className="text-sm font-medium block mb-1.5">UPI ID</label>
                  <input
                    value={config.upiId}
                    onChange={(e) => setConfig({ ...config, upiId: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. hlmf@sbi"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[var(--admin-border)]" />

          {/* Bank Details */}
          <div>
            <h2 className="font-bold mb-4 text-[var(--admin-maroon)]">🏦 Bank Account Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Account Name</label>
                <input value={config.accountName} onChange={(e) => setConfig({ ...config, accountName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Bank Name</label>
                <input value={config.bankName} onChange={(e) => setConfig({ ...config, bankName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Account Number</label>
                <input value={config.accountNo} onChange={(e) => setConfig({ ...config, accountNo: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">IFSC Code</label>
                <input value={config.ifscCode} onChange={(e) => setConfig({ ...config, ifscCode: e.target.value })} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium block mb-1.5">Branch</label>
                <input value={config.branch} onChange={(e) => setConfig({ ...config, branch: e.target.value })} className={inputClass} />
              </div>
            </div>
          </div>

          <hr className="border-[var(--admin-border)]" />

          <div className="flex gap-3">
            <button
              disabled={savingConfig}
              onClick={handleSaveConfig}
              className="px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-dark)] hover:text-white transition-all"
            >
              {savingConfig ? "Saving..." : "Save Payment Settings"}
            </button>
            <button onClick={fetchConfig} className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm">
              Reset
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ SUBMISSIONS TAB ═══════════ */}
      {tab === "submissions" && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--admin-border)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--admin-maroon)]">{counts.all}</p>
              <p className="text-xs text-[var(--admin-muted)]">Total</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{counts.pending}</p>
              <p className="text-xs text-yellow-600">Pending</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{counts.verified}</p>
              <p className="text-xs text-green-600">Verified</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">₹{totalVerified.toLocaleString()}</p>
              <p className="text-xs text-green-600">Verified Total</p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "verified", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-[var(--admin-maroon)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>

          {loadingDonations && (
            <div className="flex items-center justify-center h-40">
              <p className="text-[var(--admin-muted)]">Loading...</p>
            </div>
          )}

          {!loadingDonations && filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--admin-muted)]">
              No donation records found.
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((d) => (
              <div
                key={d._id}
                className="bg-white border border-[var(--admin-border)] rounded-2xl p-5 space-y-3"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{d.fullName}</h3>
                    <p className="text-xs text-[var(--admin-muted)]">{d.email}</p>
                    <p className="text-xs text-[var(--admin-muted)]">{d.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[d.status] || "bg-gray-100 text-gray-500"}`}>
                    {d.status}
                  </span>
                </div>

                {/* Amount + UTR */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-bold text-[var(--admin-maroon)]">₹{d.amount}</span>
                  <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    UTR: {d.utrNumber}
                  </span>
                  <span className="text-xs text-[var(--admin-muted)]">
                    {paymentModeLabels[d.paymentMode] || d.paymentMode}
                  </span>
                </div>

                {/* Date */}
                <p className="text-[10px] text-[var(--admin-muted)]">
                  {new Date(d.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Message */}
                {d.message && (
                  <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 italic">"{d.message}"</p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[var(--admin-border)]">
                  <select
                    value={d.status}
                    onChange={(e) => handleStatusChange(d._id, e.target.value)}
                    className="text-xs border border-[var(--admin-border)] rounded-lg px-3 py-1.5 outline-none focus:border-[var(--admin-accent)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDelete(d._id)}
                    className="ml-auto px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
