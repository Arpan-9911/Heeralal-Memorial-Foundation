import API from "./axios";

export const getSlides =
  async () => {
    const res =
      await API.get(
        "/heroslides"
      );

    return res.data;
  };

export const createSlide =
  async (formData) => {
    const res =
      await API.post(
        "/heroslides",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

export const updateSlide =
  async (id, formData) => {
    const res =
      await API.put(
        `/heroslides/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

export const deleteSlide =
  async (id) => {
    const res =
      await API.delete(
        `/heroslides/${id}`
      );

    return res.data;
  };