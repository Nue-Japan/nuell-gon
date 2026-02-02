"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            await auth.login(formData);
            router.push("/mainframe");
        } catch (err) {
            setError("AUTHENTICATION FAILED: Invalid credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-obsidian flex items-center justify-center p-4 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')]">
            <div className="w-full max-w-md border border-neon-purple/50 bg-black/80 backdrop-blur-sm p-8 relative shadow-[0_0_30px_rgba(168,85,247,0.1)]">

                {/* Header */}
                <div className="text-center mb-8 space-y-2">
                    <Shield className="w-12 h-12 text-neon-purple mx-auto mb-4 animate-pulse" />
                    <h1 className="text-3xl font-black text-white tracking-widest uppercase">
                        Identity Verify
                    </h1>
                    <p className="text-xs text-green-500 font-mono tracking-[0.2em]">
                        SECURE CONNECTION ESTABLISHED
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 border border-red-500/50 bg-red-500/10 text-red-500 flex items-center gap-2 text-sm font-mono">
                        <AlertTriangle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs text-neon-purple font-mono uppercase">Agent ID (Email)</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-black/50 border border-gray-700 focus:border-neon-purple text-white p-3 outline-none transition-colors font-mono"
                            placeholder="agent@nue-japan.com"
                        />
                    </div>

                    <div className="space-y-1 relative">
                        <label className="text-xs text-neon-purple font-mono uppercase">Access Key</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-black/50 border border-gray-700 focus:border-neon-purple text-white p-3 outline-none transition-colors font-mono pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-neon-purple text-black font-bold uppercase tracking-widest hover:bg-white hover:text-neon-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <span className="animate-pulse">Verifying...</span>
                        ) : (
                            <>
                                <Lock size={16} /> Authenticate
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        New Agent? <a href="/signup" className="text-neon-purple hover:underline">Register</a>
                    </p>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-purple"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-purple"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-purple"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-purple"></div>
            </div>
        </main>
    );
}
