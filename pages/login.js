import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";

export default function LoginPage(){
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <LoginForm/>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}