import { useState } from "react";
import { createClient } from "@/lib/utils/supabasecomp";
import { useRouter } from "next/router";

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    const handleEmailSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signUp({
            email, 
            password,
            options: {
                emailsRedirectTo: `${window.location.origin}/auth/callback`, 
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            if(data?.user?.identities?.length === 0) {
                setError('This email is already registered')
                setLoading(false)
            } else {
                alert('Check your email for confirmation link!')
                setLoading(false)
            }
        }
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setError(null) 

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google', 
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create an Account
                </h2>

                { error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div>
                        <input 
                            type="email"
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <input 
                            type="password"
                            placeholder="Password (min 6 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Loading...' : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}