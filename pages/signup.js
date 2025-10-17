import SignUpForm from "@/components/Auth/SignUpForm";
import { Divide } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <SignUpForm/>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}