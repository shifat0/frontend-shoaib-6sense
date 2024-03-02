"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen w-36 text-center bg-slate-700 flex flex-col items-center justify-center gap-4">
      <Link
        href="/"
        className={`text-white w-full py-2 rounded-lg transition duration-300 ${
          pathname === "/" ? "bg-red-500" : ""
        }`}
      >
        Users
      </Link>
      <Link
        href="/create-user"
        className={`text-white w-full py-2 rounded-lg transition duration-300 ${
          pathname === "/create-user" ? "bg-red-500" : ""
        }`}
      >
        Create User
      </Link>
    </div>
  );
}
