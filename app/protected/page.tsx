"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/check_login_user";
import Logout from "@/components/logout";
import {useRouter} from "next/navigation";

function Page() {
  const { user, loading } = useAuth();

  const router = useRouter()

 useEffect(() => {
    // Only redirect if loading is complete and user is not logged in
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]); 
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-300 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md text-center border border-gray-700">
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome 👋
            </h1>

            <p className="text-gray-300 mb-6">Logged in as:  
              <span className="text-blue-400 font-semibold"> {user.email}</span>
            </p>

            <Logout />
          </>
        ) : (
          <p className="text-red-400 text-lg font-semibold">
            Login first — This route is protected.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
