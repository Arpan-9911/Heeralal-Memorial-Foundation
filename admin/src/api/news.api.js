// src/api/news.api.js

import API from "./axios";

// GET
export const getNewsPosts = async () => {
  const { data } = await API.get("/news");

  return data.news;
};

// ADD
export const createNewsPost = async (formData) => {
  const { data } = await API.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.news;
};

// UPDATE
export const updateNewsPost = async (id, formData) => {
  const { data } = await API.put(`/news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.news;
};

// DELETE
export const deleteNewsPost = async (id) => {
  const { data } = await API.delete(`/news/${id}`);

  return data;
};
