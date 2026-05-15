import API from "./axios";

export const getApplications = async (formType) => {
  const params = formType ? `?formType=${formType}` : "";
  const { data } = await API.get(`/applications${params}`);
  return data;
};

export const updateApplicationStatus = async (id, status) => {
  const { data } = await API.patch(`/applications/${id}/status`, { status });
  return data;
};

export const deleteApplication = async (id) => {
  const { data } = await API.delete(`/applications/${id}`);
  return data;
};
