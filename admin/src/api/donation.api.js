import API from "./axios";

/* ───── Config (QR + Bank) ───── */

export const getDonateConfig = async () => {
  const res = await API.get("/donations/config");
  return res.data;
};

export const updateDonateConfig = async (formData) => {
  const res = await API.put("/donations/config", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/* ───── Donation Submissions ───── */

export const getDonations = async () => {
  const res = await API.get("/donations");
  return res.data;
};

export const updateDonationStatus = async (id, status) => {
  const res = await API.put(`/donations/${id}`, { status });
  return res.data;
};

export const deleteDonation = async (id) => {
  const res = await API.delete(`/donations/${id}`);
  return res.data;
};
