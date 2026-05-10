import { create } from "zustand";

const useAuthStore = create((set) => ({
  admin: null,

  loading: true,

  setAdmin: (admin) =>
    set({
      admin,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  logout: () =>
    set({
      admin: null,
    }),
}));

export default useAuthStore;