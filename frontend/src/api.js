import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// HOME PAGE DATA
export const getHomeData = async () => {
  const response = await API.get("/home");
  return response.data;
};

export const getAchievements = async () => {
  const response = await API.get("/achievements");
  return response.data;
}

export const getStats = async () => {
  const response = await API.get("/stats");
  return response.data;
}

export const getPrograms = async () => {
  const response = await API.get("/programs");
  return response.data;
}

export const getMedia = async () => {
  const response = await API.get("/media");
  return response.data;
}

export const getAnnouncements = async () => {
  const response = await API.get("/announcements");
  return response.data;
}

export const getTeams = async () => {
  const response = await API.get("/team");
  return response.data.members;
}

export const getAboutUs = async () => {
  const response = await API.get("/about-us");
  return response.data;
}

export const getSacredMemory = async () => {
  const response = await API.get("/sacred-memory");
  return response.data;
};

export const getSettings = async () => {
  const response = await API.get("/settings");
  return response.data;
};

export const getPillars = async () => {
  const response = await API.get("/pillars");
  return response.data;
};

export const getCommendationCards = async () => {
  const response = await API.get("/commendation-cards");
  return response.data;
};

export const submitContact = async (data) => {
  const response = await API.post("/contact", data);
  return response.data;
};

export const getNews = async () => {
  const response = await API.get("/news");
  return response.data;
};

export const getNewsById = async (id) => {
  const response = await API.get(`/news/${id}`);
  return response.data;
};

export default API;