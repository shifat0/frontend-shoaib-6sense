"use client";
import { useState } from "react";
import ConfirmationModal from "./components/confirmation-modal";

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 2,
    firstName: "Ema",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 3,
    firstName: "Bal",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 4,
    firstName: "fuwang",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 5,
    firstName: "hola",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 6,
    firstName: "ula",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
  {
    id: 7,
    firstName: "jala",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "013313131313",
  },
];

export default function Home() {
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // for handling block functionality
  const handleBlockedUsers = (userId: number) => {
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
  const onConfirm = (message: string, userId: number) => {
    setIsOpen(false);

    if (message === "block" || "unblock")
      if (blockedUsers.includes(userId))
        setBlockedUsers((prev) => prev.filter((id) => id !== userId));
      else setBlockedUsers((prev) => [...prev, userId]);
  };

  return (
    <main className="w-full flex flex-col items-center gap-6 p-4">
      <h1 className="text-3xl font-bold">All Users</h1>
      {/* Table starts */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/2 t-row">Full Name</th>
            <th className="w-1/2 t-row">Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="t-row text-center">
                {user.firstName} {user.lastName}
              </td>
              <td className="t-row">
                <div className="flex items-center justify-center gap-3">
                  <button className="btn">Details</button>
                  <button
                    className={`btn ${
                      blockedUsers.includes(user.id)
                        ? "bg-red-400 hover:bg-red-500"
                        : "bg-green-500 hover:bg-green-600"
                    } `}
                    onClick={() => handleBlockedUsers(user.id)}
                  >
                    {blockedUsers.includes(user.id) ? "Unblock" : "Block"}
                  </button>
                  <button className="btn bg-red-500 hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table ends */}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => onConfirm(message, selectedUser)}
        message={message}
      />
    </main>
  );
}
