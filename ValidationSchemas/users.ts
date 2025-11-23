import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required.").max(50),
  username: z.string().min(3, "Username is required.").max(50),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role required").max(10),
});
