"use client";
import { useState } from "react";
import ConfirmationModal from "./components/confirmation-modal";
import { Users } from "./api/api";
import UserTable from "./components/user-table";

export default function Home() {
  const { data: users, isLoading, error } = Users();
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // for handling block functionality
  const handleBlockedUsers = (userId: string) => {
    setIsOpen(true);
    setMessage((prev) => {
      if (prev === "block") return "unblock";
      else return "block";
    });
    setSelectedUser(userId);
  };

  // for closing confirmation model
  const onClose = () => setIsOpen(false);

  // for handling confirm functionality
  const onConfirm = (message: string, userId: string) => {
    setIsOpen(false);

    if (message === "block" || "unblock")
      if (blockedUsers.includes(userId))
        setBlockedUsers((prev) => prev.filter((id) => id !== userId));
      else setBlockedUsers((prev) => [...prev, userId]);
  };

  if (isLoading) return <span>Loading....</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <main className="w-full flex flex-col items-center gap-6 p-4">
      <h1 className="text-3xl font-bold">All Users</h1>
      <UserTable
        users={users}
        blockedUsers={blockedUsers}
        handleBlockedUsers={handleBlockedUsers}
      />
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => onConfirm(message, selectedUser)}
        message={message}
      />
    </main>
  );
}
