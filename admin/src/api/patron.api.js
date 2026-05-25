import API from "./axios";

export const getPatrons = async () => {
  const { data } = await API.get("/patrons");
  return data;
};

export const createPatron = async (formData) => {
  const { data } = await API.post("/patrons", formData);
  return data;
};

export const updatePatron = async (id, formData) => {
  const { data } = await API.put(`/patrons/${id}`, formData);
  return data;
};

export const deletePatron = async (id) => {
  const { data } = await API.delete(`/patrons/${id}`);
  return data;
};

export const reorderPatrons = async (orderedIds) => {
  const { data } = await API.patch("/patrons/reorder", { orderedIds });
  return data;
};
