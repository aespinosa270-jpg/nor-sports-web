import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const cookieStore = {
        }

        const response = NextResponse.redirect(`${origin}${next}`)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.headers.get('cookie')?.match(new RegExp(`(^| )${name}=([^;]+)`))?.[2]
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                    },
                    remove(name: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                    },
                },
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            console.log("✅ LOGIN EXITOSO: Sesión creada.")
            return response
        } else {
            console.error("❌ ERROR CRÍTICO EN AUTH:", error.message)
            return NextResponse.redirect(`${origin}/login?error=${error.message}`)
        }
    }

    console.error("❌ NO CODE: No se recibió código de Supabase.")
    return NextResponse.redirect(`${origin}/login?error=no_code_provided`)
}