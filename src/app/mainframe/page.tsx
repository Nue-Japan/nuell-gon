"use client";

import React from "react";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { Cpu, Archive, MessageSquare, Activity, ShieldCheck } from "lucide-react";

export default function MainframePage() {
    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')]">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center border-b border-neon-purple/30 pb-4">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-neon-purple animate-pulse" />
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest">NUE-MAINFRAME</h1>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs mt-4 md:mt-0">
                        <span className="text-green-500">CONNECTION: SECURE</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-neon-purple">USER: Nue-Japan</span>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. Chimera Specs */}
                    <ServiceCard
                        title="Chimera Specs"
                        description="ローカルハードウェアの能力と互換性を分析します。"
                        icon={Cpu}
                        status="READY"
                        href="/chimera-specs"
                    />

                    {/* 2. Nue Archives */}
                    <ServiceCard
                        title="Nue Archives"
                        description="開発者の履歴、スキル、プロジェクトログへのアクセス。"
                        icon={Archive}
                        status="ONLINE"
                        href="/archives"
                    />

                    {/* 3. Board -> Comm Link */}
                    <ServiceCard
                        title="Comm Link"
                        description="開発者への暗号化通信チャンネル。"
                        icon={MessageSquare}
                        status="ONLINE"
                        href="/comm-link"
                    />

                    {/* 4. Core Systems */}
                    <ServiceCard
                        title="Core Systems"
                        description="バックエンドステータス: 安定 | API レイテンシ: 45ms"
                        icon={Activity}
                        status="STABLE"
                        href="/core-systems"
                    />

                </div>
            </div>
        </main>
    );
}
