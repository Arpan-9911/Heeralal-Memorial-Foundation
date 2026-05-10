import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username too short"),

  password: z
    .string()
    .min(6, "Password too short"),
});