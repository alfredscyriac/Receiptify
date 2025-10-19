import { useState } from 'react'
import createClient from '@/lib/utils/supabaseClient'
import { useRouter } from 'next/router'
import { Mail, Lock } from 'lucide-react'

export default function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Redirect to the page they came from, or default to dashboard
            const redirectTo = router.query.redirectedFrom || '/dashboard'
            router.push(redirectTo)
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
        <div className='w-full max-w-md mx-auto'>
            <div className='bg-gray-900 shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-800'>
                <h2 className='text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
                    Sign In
                </h2>

                { error && (
                    <div className='bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className='space-y-4'>
                    <div className='relative'>
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className='w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-500'
                        />
                    </div>

                    <div className='relative'>
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className='w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-500'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-700 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Loading...' : 'Login with Email'}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="mx-4 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-750 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}