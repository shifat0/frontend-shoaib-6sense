import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email format" }),
  phoneNumber: z
    .string()
    .regex(/^(\+?88)?01[3-9](\d){8}$/, "Invalid Bangladesh phone number"),
});

export type FormValues = z.infer<typeof userFormSchema>;
