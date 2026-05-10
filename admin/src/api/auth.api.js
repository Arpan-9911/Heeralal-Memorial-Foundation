import API from "./axios";

export const loginAdmin = async (data) => {
  const response = await API.post(
    "/admin/login",
    data
  );

  return response.data;
};

export const logoutAdmin = async () => {
  const response = await API.post(
    "/admin/logout"
  );

  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await API.get(
    "/admin/me"
  );

  return response.data;
};