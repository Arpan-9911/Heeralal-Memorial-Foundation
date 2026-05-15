import API from "./axios";

export const getPillars = async () => {
  const { data } = await API.get("/pillars");
  return data;
};

export const createPillar = async (payload) => {
  const { data } = await API.post("/pillars", payload);
  return data;
};

export const updatePillar = async (id, payload) => {
  const { data } = await API.put(`/pillars/${id}`, payload);
  return data;
};

export const deletePillar = async (id) => {
  const { data } = await API.delete(`/pillars/${id}`);
  return data;
};
