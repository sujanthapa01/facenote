"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
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
      // Email not found => Create new account
      if (error.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setPrint("Account created successfully!");
            await signInWithEmailAndPassword(auth, email, password);
        } catch (createError: any) {
          handleFirebaseError(createError.code);
        }
      } else {
        handleFirebaseError(error.code);
      }
    }
  };

  const handleFirebaseError = (code: string) => {
    switch (code) {
      case "auth/invalid-email":
        setPrint("Invalid email format.");
        break;
      case "auth/wrong-password":
        setPrint("Incorrect password.");
        break;
      case "auth/email-already-in-use":
        setPrint("This email is already registered.");
        break;
      case "auth/weak-password":
        setPrint("Password must be at least 6 characters.");
        break;
      default:
        setPrint("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 items-center justify-center h-44">
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
      </div>
    </div>
  );
}

export default Page;
