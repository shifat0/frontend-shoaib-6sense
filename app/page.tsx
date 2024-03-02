"use client";
import { useState } from "react";
import ConfirmationModal from "./components/confirmation-modal";
import UserTable from "./components/user-table";
import { DeleteUser } from "./api/api";

export default function Home() {
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [operation, setOperation] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // query delete user api
  const mutation = DeleteUser();

  // for handling block and delete user
  const handleUser = (operation: string, userId: string) => {
    setIsOpen(true);
    if (operation === "block") {
      setOperation((prev) => {
        if (prev === operation) return "unblock";
        else return operation;
      });
    } else setOperation(operation);
    setSelectedUser(userId);
  };

  // for closing confirmation model
  const onClose = () => setIsOpen(false);

  // for handling confirm functionality
  const onConfirm = () => {
    setIsOpen(false);

    // functionality for delete and block user
    if (operation === "delete") mutation.mutate(selectedUser);
    else if (operation === "block" || "unblock") {
      if (blockedUsers.includes(selectedUser))
        setBlockedUsers((prev) => prev.filter((id) => id !== selectedUser));
      else setBlockedUsers((prev) => [...prev, selectedUser]);
    }
  };

  return (
    <main className="w-full flex flex-col items-center gap-6 p-4">
      <h1 className="text-3xl font-bold">All Users</h1>
      <UserTable blockedUsers={blockedUsers} handleUser={handleUser} />
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        operation={operation}
      />
    </main>
  );
}
