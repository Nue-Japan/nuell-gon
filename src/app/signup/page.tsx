"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import { UserPlus, AlertTriangle } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            await auth.signup({ email, password });
            // Auto-login after signup
            const loginData = new FormData();
            loginData.append("email", email);
            loginData.append("password", password);
            await auth.login(loginData);

            router.push("/mainframe");
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("REGISTRATION FAILED. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-obsidian flex items-center justify-center p-4 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')]">
            <div className="w-full max-w-md border border-gray-800 bg-black/90 backdrop-blur-sm p-8 relative">

                {/* Header */}
                <div className="text-center mb-8 space-y-2">
                    <UserPlus className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white uppercase tracking-widest">
                        Agent Registration
                    </h1>
                    <p className="text-xs text-gray-500 font-mono">
                        INITIATING PROTOCOL: NEW_USER
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
                        <label className="text-xs text-gray-400 font-mono uppercase">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-transparent border border-gray-700 focus:border-white text-white p-3 outline-none transition-colors font-mono"
                            placeholder="agent@nue-japan.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-mono uppercase">Set Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            className="w-full bg-transparent border border-gray-700 focus:border-white text-white p-3 outline-none transition-colors font-mono"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-mono uppercase">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={8}
                            className="w-full bg-transparent border border-gray-700 focus:border-white text-white p-3 outline-none transition-colors font-mono"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Confirm Registration"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an ID? <a href="/login" className="text-white hover:underline">Authenticate</a>
                    </p>
                </div>

            </div>
        </main>
    );
}
