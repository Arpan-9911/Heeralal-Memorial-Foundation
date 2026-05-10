import { useEffect } from "react";

import { getCurrentAdmin } from "../api/auth.api";

import useAuthStore from "../store/authStore";

const useAuth = () => {
  const {
    admin,
    setAdmin,
    loading,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res =
          await getCurrentAdmin();

        setAdmin(res.admin);
      } catch (error) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    admin,
    loading,
  };
};

export default useAuth;