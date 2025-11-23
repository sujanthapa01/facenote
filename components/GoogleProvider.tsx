"use client"
import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/lib/firebase';
import Image from "next/image";
// import GoogleLogo from '@/assets/images/google.png';


export const GoogleProvider: React.FC = () => {
    const handleGoogleProvider = async () => {
        const provider = new GoogleAuthProvider()
        try {

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            console.log(user)
        } catch (error) {
            console.error("Error during Google sign-in: ", error);
            alert("Failed to sign in with Google.");
        }

    }

    return (
        <div className="flex justify-center items-center cursor-pointer">
            <button
                onClick={handleGoogleProvider}
                className="flex items-center justify-center bg-white border-2 border-gray-300 rounded-xl py-2 px-6 hover:shadow-lg transition duration-200 ease-in-out"
            >

            <Image src="/images/google.png" alt="" width={32} height={32}/>

                <span className="text-gray-800 font-semibold">Sign in with Google</span>
            </button>
        </div>
    )
}

