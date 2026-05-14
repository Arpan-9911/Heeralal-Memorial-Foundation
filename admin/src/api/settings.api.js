import API from "./axios";

export const getSettings = async () => {
  const res = await API.get("/settings");
  return res.data;
};

export const updateSettings = async (settingsData) => {
  const res = await API.put("/settings", settingsData);
  return res.data;
};
