"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Logout() {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transition-all"
    >
      Logout
    </button>
  );
}
