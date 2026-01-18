"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabaseClient"
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (!session) {
                    router.replace('../Login');
                    console.error(error)
                }
                
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        checkAuth();
    }, [router])
    if (loading) {
        return <p>Loading ....</p>
    }
    return <>{children}</>
}
export default AuthGuard