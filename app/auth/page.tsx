"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/check_login_user";
import {handleFirebaseError} from "@/errors/firebase_Err"
import {GoogleProvider} from "@/components/GoogleProvider"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Page() {
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [print, setPrint] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      setPrint("Please fill the email and password");
      return;
    }

    try {
      // Try to login
      await signInWithEmailAndPassword(auth, email, password);
      setPrint("Login successful!");
    } catch (error: any) {
       const errorMessage = handleFirebaseError(error.code); // Get error message
           setPrint(errorMessage); // Set error message to display
    }
  };

  const { loading, user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading && user) {
      router.replace("/protected")
    }
  }, [loading, user, router])

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {/* <div className="flex flex-col gap-4 items-center justify-center h-44">
        {print && <p className="text-red-400">{print}</p>}

        <input
          type="text"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
          className="border-white rounded-md border-[1px] px-2 py-1 text-white"
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-white rounded-md border-[1px] px-2 py-1 text-white"
        />

        <button
          onClick={handleLogin}
          className="bg-white rounded-full text-black w-12 h-12 cursor-pointer hover:scale-110 duration-200 border-2 border-transparent hover:border-white flex items-center justify-center"
        >
          {"--->"}
        </button>

      </div> */}

<div className="flex flex-col gap-4 items-center justify-center">

        {/* <div onClick={() => {router.replace("/auth/create-account")}} className=" mt-24 font-thin italic cursor-pointer underline hover:text-blue-600 duration-200 hover:underline">
          create account
        </div>
       <span className="italic font-bold text-xl">or</span> */}
        <div>
          <GoogleProvider/>
        </div>
</div>
    </div>
  );
}

export default Page;
