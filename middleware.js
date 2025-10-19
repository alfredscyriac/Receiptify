import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
    let response = NextResponse.next({
        request: {
            headers: request.headers, 
        }, 
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value
                }, 
                set(name, value, options) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers, 
                        }, 
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name, options) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options, 
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name, 
                        value: '',
                        ...options, 
                    })
                }, 
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/financedashboard']
    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
    )

    // If accessing a protected route without authentication, redirect to login
    if (isProtectedRoute && !user) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/financedashboard/:path*',
        '/api/:path*'
    ],
}