import api from "./axios";

export const getSacredMemory = async () => {
  const response = await api.get("/sacred-memory");
  return response.data;
};

export const updateSacredMemory = async (data) => {
  const response = await api.put("/sacred-memory", data);
  return response.data;
};
