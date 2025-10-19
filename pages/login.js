import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import createClient from "@/lib/utils/supabaseClient";

export default function LoginPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // User is already logged in, redirect to dashboard
                router.push('/dashboard');
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <LoginForm/>
                <p className="text-center text-gray-400 mt-4">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-cyan-500 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}