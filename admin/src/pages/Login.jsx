import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { loginAdmin } from "../api/auth.api";
import useAuthStore from "../store/authStore";

const loginSchema = z.object({
  username: z.string().min(3),

  password: z.string().min(6),
});

const Login = () => {
  const { admin, setAdmin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginAdmin(data);

      setAdmin(res.admin);

      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (admin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-md bg-white rounded-2xl border border-[var(--admin-border)] shadow-xl p-8"
      >
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--admin-maroon)] flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>

          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>

          <p className="text-sm text-[var(--admin-muted)] mt-1">
            Secure dashboard access
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Username</label>

            <input
              type="text"
              {...register("username")}
              className="mt-2 w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--admin-maroon)]"
              placeholder="Enter username"
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full border border-[var(--admin-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--admin-maroon)]"
              placeholder="Enter password"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-[var(--admin-maroon)] hover:opacity-90 text-white rounded-xl py-3 font-semibold transition-all"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
