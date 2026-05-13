import API from "./axios";

export const getAboutUs = async () => {
  const res = await API.get("/about-us");
  return res.data;
};

export const updateAboutUs = async (formData) => {
  const res = await API.put(
    "/about-us",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
