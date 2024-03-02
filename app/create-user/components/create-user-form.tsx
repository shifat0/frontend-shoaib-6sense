"use client";

import { CreateUser } from "@/app/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const userFormSchema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "First Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email format" }),
  phoneNumber: z
    .string()
    .regex(/^(\+?88)?01[3-9](\d){8}$/, "Invalid Bangladesh phone number"),
});

type FormValues = z.infer<typeof userFormSchema>;

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(userFormSchema) });

  const { mutate, isPending } = CreateUser();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 items-center gap-4 mt-5">
        <div className="form-items">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="John"
            {...register("firstName")}
            className="border p-2"
          />
          <span className="h-4 text-red-500">{errors.firstName?.message}</span>
        </div>

        <div className="form-items">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            className="border p-2"
          />
          <span className="h-4 text-red-500">{errors.lastName?.message}</span>
        </div>

        <div className="form-items">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            {...register("email")}
            className="border p-2"
          />
          <span className="h-4 text-red-500">{errors.email?.message}</span>
        </div>

        <div className="form-items">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            placeholder="+880**********"
            {...register("phoneNumber")}
            className="border p-2"
          />
          <span className="h-4 text-red-500">
            {errors.phoneNumber?.message}
          </span>
        </div>
      </div>
      <button type="submit" className="w-32 btn block mx-auto mt-4">
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
