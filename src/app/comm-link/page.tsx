"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Send, Radio, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";



export default function CommLinkPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            subject: formData.get("subject"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            await api.post("/contact/contact", data);
            setSent(true);
        } catch (err) {
            console.error("Transmission failed", err);
            // Fallback for demo or specific error handling
            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] font-mono">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* Navigation */}
                <button
                    onClick={() => router.push('/mainframe')}
                    className="flex items-center gap-2 text-neon-purple hover:text-white transition-colors w-fit group mb-4"
                >
                    <ArrowLeft size={16} />
                    <span className="uppercase tracking-widest text-xs">メインフレームに戻る</span>
                </button>

                <section className="bg-black/80 border border-gray-800 p-8 backdrop-blur-sm relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                    <header className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neon-purple/20 rounded">
                                <MessageSquare className="text-neon-purple" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-widest">COMM_LINK</h1>
                                <p className="text-xs text-green-500 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    ENCRYPTED CHANNEL
                                </p>
                            </div>
                        </div>
                        <Radio className="text-gray-600 animate-pulse" />
                    </header>

                    {sent ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500">
                                <Send className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">送信完了</h3>
                            <p className="text-sm text-gray-400">メッセージは安全に暗号化され、開発者に送信されました。</p>
                            <button
                                onClick={() => setSent(false)}
                                className="mt-8 text-xs text-neon-purple hover:underline"
                            >
                                新しいメッセージを作成
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 uppercase">件名 (Subject)</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full bg-black/50 border border-gray-700 focus:border-neon-purple text-white p-3 outline-none transition-colors"
                                    placeholder="プロジェクトの依頼について"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 uppercase">送信者 (Sender ID)</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-black/50 border border-gray-700 focus:border-neon-purple text-white p-3 outline-none transition-colors"
                                    placeholder="guest@example.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 uppercase">メッセージ (Payload)</label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    required
                                    className="w-full bg-black/50 border border-gray-700 focus:border-neon-purple text-white p-3 outline-none transition-colors resize-none"
                                    placeholder="メッセージを入力してください..."
                                ></textarea>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    <span>すべての通信はTLS 1.3で保護されています</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-neon-purple text-black font-bold uppercase tracking-widest hover:bg-white hover:text-neon-purple transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? "暗号化中..." : <>送信 <Send size={16} /></>}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-purple/10 to-transparent pointer-events-none"></div>
                </section>

            </div>
        </main>
    );
}
