import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Ignore cancelled requests
    if (
      axios.isCancel(error)
    ) {
      return Promise.resolve();
    }

    // Skip refresh endpoint
    if (
      originalRequest?.url?.includes(
        "/admin/refresh"
      )
    ) {
      return Promise.resolve({
        data: null,
      });
    }

    // Skip login page
    if (
      window.location.pathname ===
      "/login"
    ) {
      return Promise.resolve({
        data: null,
      });
    }

    // Handle token expiration
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          await API.post(
            "/admin/refresh"
          );

          isRefreshing = false;
        }

        return API(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Silent fail
        return Promise.resolve({
          data: null,
        });
      }
    }

    // Silence expected auth errors
    if (
      error.response?.status === 401
    ) {
      return Promise.resolve({
        data: null,
      });
    }

    // Only log unexpected errors
    console.error(error);

    return Promise.reject(error);
  }
);

export default API;