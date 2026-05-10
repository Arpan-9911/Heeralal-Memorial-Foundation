// src/api/media.api.js

import API from "./axios";

// ================= IMAGES =================

export const getGalleryImages = async () => {
  const { data } = await API.get("/media");

  return data;
};

export const uploadGalleryImage = async (formData) => {
  const { data } = await API.post("/media/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteGalleryImage = async (id) => {
  const { data } = await API.delete(`/media/image/${id}`);

  return data;
};

// ================= VIDEO =================

export const getGalleryVideo = async () => {
  const { data } = await API.get("/media");

  return data;
};

export const saveGalleryVideo = async (formData) => {
  const { data } = await API.post("/media/video", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteGalleryVideo = async () => {
  const { data } = await API.delete("/media/video");

  return data;
};
