import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/utils/supabaseClient";

export default function ProtectedRoute({children}) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/login')
            } else {
                setAuthenticated(true)
            }
            setLoading(false)
        }
        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.push('./login')
            } else {
                setAuthenticated(true)
            }
        })

        return () => subscription.unsubscribe()
    }, [router, supabase])

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        )
    }

    if (!authenticated) {
        return null
    }

    return <>{children}</>
}