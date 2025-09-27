import { z } from "zod";

export const CreateAccountFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  number: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Number must be exactly 10 digits" }),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name must only contain letters and spaces" }),

  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(12, { message: "Password must be at most 12 characters" }),
});
