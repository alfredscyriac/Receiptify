import { useState } from 'react'
import { createClient } from '@/lib/utils/supabasecomp'
import { useRouter } from 'next/router'

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
            router.push('/')
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
            <div className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
                    Login
                </h2>

                { error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className='space-y-4'>
                    <div>
                        <input 
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={loading} 
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
                        />
                    </div>

                    <div>
                        <input 
                            type="password"
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            disabled={loading}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-whte font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Loading...' : 'Login with Email'}
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
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex  items-center justify-center gap-2"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}