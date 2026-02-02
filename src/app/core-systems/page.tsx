"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Activity, Server, Database, Globe, RefreshCw } from "lucide-react";

export default function CoreSystemsPage() {
    const router = useRouter();
    const [latency, setLatency] = useState(45);
    const [dbStatus, setDbStatus] = useState("ONLINE");
    const [apiStatus, setApiStatus] = useState("STABLE");

    // Simulation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(30 + Math.floor(Math.random() * 30));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] font-mono">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Navigation */}
                <button
                    onClick={() => router.push('/mainframe')}
                    className="flex items-center gap-2 text-neon-purple hover:text-white transition-colors w-fit group"
                >
                    <ArrowLeft size={16} />
                    <span className="uppercase tracking-widest text-xs">メインフレームに戻る</span>
                </button>

                <header className="mb-8 border-b border-neon-purple/30 pb-4">
                    <h1 className="text-2xl font-black text-white tracking-widest flex items-center gap-2">
                        <Activity className="text-neon-purple" />
                        CORE SYSTEMS MONITOR
                    </h1>
                    <p className="text-xs text-gray-500 mt-2">REAL-TIME INFRASTRUCTURE DIAGNOSTICS</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* API Node */}
                    <div className="bg-black/40 border border-green-500/30 p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs text-green-500">{apiStatus}</span>
                        </div>
                        <div className="mb-4 text-green-500">
                            <Server size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">FastAPI Backend</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="text-white">Running</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Latency</span>
                                <span className="text-neon-purple">{latency}ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Uptime</span>
                                <span className="text-white">99.9%</span>
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[98%]"></div>
                        </div>
                    </div>

                    {/* DB Node */}
                    <div className="bg-black/40 border border-blue-500/30 p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-xs text-blue-500">{dbStatus}</span>
                        </div>
                        <div className="mb-4 text-blue-500">
                            <Database size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">PostgreSQL Database</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex justify-between">
                                <span>Connection</span>
                                <span className="text-white">Pool Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Replica</span>
                                <span className="text-white">Primary</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Migrations</span>
                                <span className="text-white">Synced</span>
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[100%]"></div>
                        </div>
                    </div>

                    {/* Frontend Node */}
                    <div className="bg-black/40 border border-purple-500/30 p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            <span className="text-xs text-purple-500">ONLINE</span>
                        </div>
                        <div className="mb-4 text-purple-500">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Next.js Frontend</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex justify-between">
                                <span>Build</span>
                                <span className="text-white">Production</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Rendering</span>
                                <span className="text-white">ISR / SSR</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Assets</span>
                                <span className="text-white">Optimized</span>
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[100%]"></div>
                        </div>
                    </div>

                    {/* Rust Core Node */}
                    <div className="bg-black/40 border border-orange-500/30 p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-xs text-orange-500">LOADED</span>
                        </div>
                        <div className="mb-4 text-orange-500">
                            <RefreshCw size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Rust Neural Core</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex justify-between">
                                <span>Module</span>
                                <span className="text-white">nuell_gon_backend</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Binding</span>
                                <span className="text-white">PyO3 / Maturin</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Performance</span>
                                <span className="text-white">Native</span>
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[100%]"></div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
