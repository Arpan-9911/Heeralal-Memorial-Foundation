import API from "./axios";

export const getMembers = async () => {
  const { data } = await API.get("/team");

  return data;
};

export const createMember = async (formData) => {
  const { data } = await API.post("/team", formData);

  return data;
};

export const updateMember = async (id, formData) => {
  const { data } = await API.put(`/team/${id}`, formData);

  return data;
};

export const deleteMember = async (id) => {
  const { data } = await API.delete(`/team/${id}`);

  return data;
};
