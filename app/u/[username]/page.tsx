'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/check_login_user'

const Page = () => {

    const { username } = useParams()
    const { user, loading } = useAuth()

    const [error, setError] = useState<string>("")
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {

        if (loading) return   // wait for auth to finish
        if (!user) {
            setError("Please login first")
            return
        }

        const fetchUser = async () => {
            try {
                const ref = query(
                    collection(db, 'users'),
                    where('username', "==", username)
                )

                const res = await getDocs(ref)

                if (res.empty) {
                    setError(`${username} does not exist`)
                    return
                }

                setUserData(res.docs[0].data())

            } catch (error: any) {
                setError("Internal server error")
            }
        }

        fetchUser()

    }, [username, user, loading])


    // 🟡 UI Handling
    if (loading) return <>Checking auth...</>
    if (error) return <div className='text-red-500'>{error}</div>
    if (!userData) return <>Loading Profile...</>   // prevent crash

    return (
        <div>
            <p>Username — @{userData.username}</p>
            <p>Email — {userData.email}</p>
        </div>
    )
}

export default Page
