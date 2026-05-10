import API from "./axios";

export const getSocialLinks = async () => {
  const res = await API.get("/social-links");
  return res.data;
};

export const updateSocialLinks = async (data) => {
  const res = await API.put("/social-links", data);
  return res.data;
};
