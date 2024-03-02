import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API url is kept public for now. In real production this should be in .env file
const url = "https://65bf367e25a83926ab94a317.mockapi.io/api/v1";

// fetching users from mockAPI
const fetchUsers = async () => {
  const res = await axios.get(`${url}/users`);
  return res.data;
};

export const Users = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

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
