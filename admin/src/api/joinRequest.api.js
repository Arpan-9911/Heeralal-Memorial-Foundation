import API from "./axios";

export const getJoinRequests = async () => {
  const res = await API.get("/join-requests");
  return res.data;
};

export const updateJoinRequestStatus = async (id, status) => {
  const res = await API.put(`/join-requests/${id}`, { status });
  return res.data;
};

export const deleteJoinRequest = async (id) => {
  const res = await API.delete(`/join-requests/${id}`);
  return res.data;
};
