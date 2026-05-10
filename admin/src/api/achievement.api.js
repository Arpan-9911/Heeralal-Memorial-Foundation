import API from "./axios";

export const getAchievements = async () => {
  const { data } = await API.get("/achievements");

  return data;
};

export const createAchievement = async (formData) => {
  const { data } = await API.post("/achievements", formData);

  return data;
};

export const updateAchievement = async (id, formData) => {
  const { data } = await API.put(`/achievements/${id}`, formData);

  return data;
};

export const deleteAchievement = async (id) => {
  const { data } = await API.delete(`/achievements/${id}`);

  return data;
};
