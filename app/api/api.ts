import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserFormData } from "../lib/definitions";
import { FormValues } from "../lib/form-validation";

// API url is kept public for now. In real production this should be in .env file
const url = "https://65bf367e25a83926ab94a317.mockapi.io/api/v1";

// fetching users
const fetchUsers = async () => {
  const res = await axios.get(`${url}/users`);
  return res.data;
};

export const Users = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

// fetch single user
export const User = (userId: string) =>
  useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await axios.get(`${url}/users/${userId}`);
      return res.data;
    },
  });

// creating user
const postUserData = async (userData: UserFormData) =>
  await axios.post(`${url}/users`, userData);

export const CreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const UpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: FormValues) =>
      await axios.put(`${url}/users/${userId}`, updatedData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users", userId] }),
  });
};

// deleting user
const deleteUser = async (userId: string) =>
  await axios.delete(`${url}/users/${userId}`);

export const DeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
