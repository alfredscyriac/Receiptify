import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/utils/supabasecomp";

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.push('/')
            }
        })
    }, [router])

    return <div>Loading...</div>
}