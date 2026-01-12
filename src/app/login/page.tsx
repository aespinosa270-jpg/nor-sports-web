'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FiCommand, FiArrowRight, FiCheck } from 'react-icons/fi'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [msg, setMsg] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMsg('')

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`,
            },
        })

        if (error) {
            setMsg(error.message)
        } else {
            setSent(true)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-nor-black text-nor-white p-4">
            <div className="w-full max-w-md border border-nor-white/20 p-8 bg-nor-concrete/10 backdrop-blur-sm">

                <div className="mb-8 text-center">
                    <FiCommand className="mx-auto text-3xl mb-4 text-nor-white/80" />
                    <h1 className="font-syncopate font-bold text-xl tracking-widest">NØR ACCESS</h1>
                    <p className="text-xs font-mono text-nor-white/50 mt-2">RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY</p>
                </div>

                {!sent ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="ENTER OPERATOR EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-nor-black border border-nor-white/30 p-3 font-mono text-center focus:border-nor-accent outline-none transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-nor-white text-nor-black py-3 font-bold hover:bg-nor-accent transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? 'AUTHENTICATING...' : <>SEND ACCESS LINK <FiArrowRight /></>}
                        </button>

                        {msg && <p className="text-red-500 text-xs text-center font-mono mt-2">{msg}</p>}
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                            <FiCheck size={32} />
                        </div>
                        <h3 className="font-bold">LINK SENT</h3>
                        <p className="text-sm font-mono text-nor-white/60">
                            Check your inbox ({email}) for the secure access key.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}