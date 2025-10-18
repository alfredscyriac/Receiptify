import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/utils/supabasecomp";

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            const supabase = createClient()

            const { data: { session }, error } = await supabase.auth.getSession()

            if (error) {
                console.error('Error getting session:', error.message)
                router.push('/login')
                return
            }

            if (session) {
                router.push('/dashboard')
            } else {
                router.push('/login')
            }
        }
        handleCallback()
    }, [router])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Completing sign in...</p>
            </div>
        </div>
    )
}