import API from "./axios";

export const getCommendationCards = async () => {
  const { data } = await API.get("/commendation-cards");
  return data;
};

export const createCommendationCard = async (formData) => {
  const { data } = await API.post("/commendation-cards", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateCommendationCard = async (id, formData) => {
  const { data } = await API.put(`/commendation-cards/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteCommendationCard = async (id) => {
  const { data } = await API.delete(`/commendation-cards/${id}`);
  return data;
};

export const reorderCommendationCards = async (orderedIds) => {
  const { data } = await API.patch("/commendation-cards/reorder", { orderedIds });
  return data;
};
