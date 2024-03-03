"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { DetailsModalProps } from "../lib/definitions";
import { userFormSchema, FormValues } from "../lib/form-validation";
import { UpdateUser, User } from "../api/api";

export default function DetailsModal({
  isOpen,
  onClose,
  id,
}: DetailsModalProps) {
  const { data: user, isLoading, error } = User(id);
  const { mutate, isPending, isSuccess } = UpdateUser(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  if (!isOpen) return null;
  if (error) return <p>{error.message}</p>;
  if (isSuccess) onClose();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-500">
          User Details
        </h1>
        {isLoading ? (
          "Loading..."
        ) : (
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
                <span className="h-4 text-red-500">
                  {errors.firstName?.message}
                </span>
              </div>

              <div className="form-items">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="border p-2"
                />
                <span className="h-4 text-red-500">
                  {errors.lastName?.message}
                </span>
              </div>

              <div className="form-items">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  disabled
                  className="border p-2 cursor-not-allowed"
                />
                <span className="h-4 text-red-500">
                  {errors.email?.message}
                </span>
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
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                className="w-32 btn bg-red-500 hover:bg-red-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="w-32 btn">
                {isPending ? "Updating.." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
