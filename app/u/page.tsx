'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/check_login_user'
import { db } from '@/lib/firebase'
import { doc, collection, getDoc, setDoc, getDocs, where, query } from 'firebase/firestore'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'

const page = () => {

    const { user, loading } = useAuth()
    const router = useRouter()

    const [username, setUsername] = useState<string>("")
    const [checking, setChecking] = useState<boolean>(true)
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false)


    useEffect(() => {

        const checkUser = async () => {
            if (!loading && user) {
                const ref = doc(db, "users", user.uid)
                const snap = await getDoc(ref)

                if (snap.exists() && snap.data().username) {
                    router.replace(snap.data().username)
                } else {
                    setChecking(false);
                }

            }
        }

checkUser()
    }, [user,router, loading])


    const hanldeSetUsername = async () => {
        if (!username) return alert("Enter a vlaid username")

        const q = query(collection(db, "users"), where("username", "==", username))
        const result = await getDocs(q)

        if (!result.empty) {
            setUsernameTaken(true)
            return
        }else{
            setUsernameTaken(false)
        }
        if (!user?.uid) return
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            photo: user.photoURL,
            username: username.toLowerCase()
        })


        router.replace(`/u/${username}`)
    }


    if(loading){
        return <>loading..</>
    }



    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-4">Choose Your Username</h1>

          <span className='bg-black'>{username} is {!usernameTaken ?  <>not taken</> : <>taken</>} </span>

            <input
                className="p-2 bg-gray-800 rounded w-full"
                placeholder="type your username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />


            <button
                onClick={hanldeSetUsername}
                className="mt-4 bg-blue-600 px-4 py-2 rounded"
            >
                Save Username
            </button>
        </div>
    )
}

export default page