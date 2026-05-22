import API from "./axios";

export const getPrograms =
  async () => {
    const { data } =
      await API.get(
        "/programs"
      );

    return data;
  };

export const createProgram =
  async (formData) => {
    const { data } =
      await API.post(
        "/programs",
        formData
      );

    return data;
  };

export const updateProgram =
  async (
    id,
    formData
  ) => {
    const { data } =
      await API.put(
        `/programs/${id}`,
        formData
      );

    return data;
  };

export const deleteProgram =
  async (id) => {
    const { data } =
      await API.delete(
        `/programs/${id}`
      );

    return data;
  };

export const reorderPrograms =
  async (orderedIds) => {
    const { data } =
      await API.patch(
        "/programs/reorder",
        { orderedIds }
      );

    return data;
  };