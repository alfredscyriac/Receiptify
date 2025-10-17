import SignUpForm from "@/components/Auth/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <SignUpForm/>
                <p className="text-center text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="bg-cyan-500 hover:from-purple-700 hover:via-purple-600 hover:to-cyan-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}