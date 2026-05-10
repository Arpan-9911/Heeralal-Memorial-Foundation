import API from "./axios";

export const getCommendation = async () => {
  const res = await API.get("/commendation");
  return res.data;
};

export const updateCommendation = async (formData) => {
  const res = await API.put(
    "/commendation",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
