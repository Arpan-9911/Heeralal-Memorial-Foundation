// src/api/stats.api.js

import API from "./axios";

// GET
export const getStatsData = async () => {
  const { data } = await API.get("/stats");

  return data.stats;
};

// CREATE
export const createStat = async (payload) => {
  const { data } = await API.post("/stats", payload);

  return data.stat;
};

// UPDATE
export const updateStat = async (id, payload) => {
  const { data } = await API.put(`/stats/${id}`, payload);

  return data.stat;
};

// DELETE
export const deleteStat = async (id) => {
  const { data } = await API.delete(`/stats/${id}`);

  return data;
};
