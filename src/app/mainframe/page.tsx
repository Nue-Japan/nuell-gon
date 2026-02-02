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
                        <span className="text-neon-purple">USER: GUEST_01</span>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. Chimera Specs */}
                    <ServiceCard
                        title="Chimera Specs"
                        description="Analyze local hardware capabilities and compatibility."
                        icon={Cpu}
                        status="READY"
                        href="/chimera-specs"
                    />

                    {/* 2. Nue Archives */}
                    <ServiceCard
                        title="Nue Archives"
                        description="Access developer history, skills, and project logs."
                        icon={Archive}
                        status="ONLINE"
                        href="/archives"
                    />

                    {/* 3. Board */}
                    <ServiceCard
                        title="Comm Link"
                        description="Encrypted communication channel with the developer."
                        icon={MessageSquare}
                        status="LOCKED"
                        disabled={true}
                    />

                    {/* 4. System Status */}
                    {/* Custom Content for Metrics could be handled inside ServiceCard or a separate component. 
                For now using ServiceCard with a static description as per spec. 
            */}
                    <ServiceCard
                        title="Core Systems"
                        description="Backend Status: STABLE | API Latency: 45ms | Active Nodes: 3"
                        icon={Activity}
                        status="STABLE"
                    />

                </div>
            </div>
        </main>
    );
}
