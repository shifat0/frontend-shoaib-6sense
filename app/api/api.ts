import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreateUserData } from "../lib/definitions";

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

// creating user
const postUserData = async (userData: CreateUserData) =>
  await axios.post(`${url}/users`, userData);

export const CreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

// deleting user
const deleteUser = async (userId: string) =>
  await axios.delete(`${url}/users/${userId}`);

export const DeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  return mutation;
};
