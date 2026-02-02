"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Terminal,
    Database,
    Globe,
    Shield,
    Code,
    GitBranch,
    Server,
    Cpu,
    Download,
    ExternalLink
} from "lucide-react";

// --- Data ---
const SKILLS = [
    { name: "FastAPI", level: 95, icon: Server, category: "Backend" },
    { name: "Rust", level: 80, icon: Cpu, category: "Backend" },
    { name: "Next.js", level: 90, icon: Globe, category: "Frontend" },
    { name: "React", level: 92, icon: Code, category: "Frontend" },
    { name: "PostgreSQL", level: 85, icon: Database, category: "Database" },
    { name: "Docker", level: 88, icon: Terminal, category: "DevOps" },
    { name: "Security", level: 85, icon: Shield, category: "Ops" },
    { name: "Git", level: 90, icon: GitBranch, category: "Tools" },
];

const PROJECTS = [
    {
        id: 1,
        title: "Nuel-Gon Mainframe",
        date: "2026.02 - Present",
        role: "リードエンジニア",
        tech: ["Next.js", "FastAPI", "Rust", "Tailwind"],
        description: "セキュアなポートフォリオ＆サービスポータル。高性能なRustバックエンドとサイバーパンクテーマのUIを統合。",
        status: "ACTIVE"
    },
    {
        id: 2,
        title: "Project Chimera",
        date: "2025.08 - 2026.01",
        role: "コア開発",
        tech: ["Rust", "WASM", "WebGL"],
        description: "実験的なブラウザベースのハードウェア診断ツール。WebAssemblyを活用し、ネイティブに近いパフォーマンスを実現。",
        status: "ARCHIVED"
    },
    {
        id: 3,
        title: "Obsidian Vault",
        date: "2024.11 - 2025.05",
        role: "セキュリティアーキテクト",
        tech: ["Python", "Cryptography", "AWS"],
        description: "機密性の高い企業データ向けのゼロ知識証明ストレージソリューション。カスタム鍵交換プロトコルを実装。",
        status: "CLASSIFIED"
    }
];

export default function ArchivesPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] font-mono">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Navigation & Header */}
                <header className="flex flex-col gap-6">
                    <button
                        onClick={() => router.push('/mainframe')}
                        className="flex items-center gap-2 text-neon-purple hover:text-white transition-colors w-fit group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-sm">メインフレームに戻る</span>
                    </button>

                    <div className="border-b border-neon-purple/30 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-2 glitch-text">
                                NUE ARCHIVES
                            </h1>
                            <p className="text-sm text-neon-purple uppercase tracking-[0.3em]">
                                SECURE DATA VAULT // LEVEL 5 ACCESS
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 bg-black/50 hover:border-white transition-colors text-xs uppercase tracking-wider">
                                <Download size={14} /> ドキュメントDL
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile & Skills */}
                    <div className="space-y-8 lg:col-span-1">

                        {/* Agent Profile Card */}
                        <section className="bg-black/40 border border-gray-800 p-6 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <Shield size={64} className="text-gray-800" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-neon-purple/20 border border-neon-purple mb-4 flex items-center justify-center">
                                    <span className="text-3xl font-black text-neon-purple">NG</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Nue-Japan</h2>
                                <p className="text-neon-purple text-sm mb-4">Full Stack Security Engineer</p>

                                <div className="space-y-2 text-xs text-gray-400 border-t border-gray-800 pt-4">
                                    <div className="flex justify-between">
                                        <span>STATUS</span>
                                        <span className="text-green-500">ACTIVE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>LOCATION</span>
                                        <span>TOKYO, JP</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>CLEARANCE</span>
                                        <span>ALPHA-MAINFRAME</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 border border-neon-purple/0 group-hover:border-neon-purple/30 transition-colors pointer-events-none"></div>
                        </section>

                        {/* Tech Weaponry (Skills) */}
                        <section>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-l-4 border-neon-purple pl-3">
                                TECH WEAPONRY
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {SKILLS.map((skill) => (
                                    <div key={skill.name} className="bg-gray-900/50 border border-gray-800 p-3 hover:border-neon-purple transition-colors group cursor-default">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-white">
                                            <skill.icon size={16} />
                                            <span className="text-xs font-bold uppercase">{skill.name}</span>
                                        </div>
                                        <div className="h-1 w-full bg-gray-800 overflow-hidden">
                                            <div
                                                className="h-full bg-neon-purple group-hover:bg-white transition-all duration-500"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Mission Logs (Timeline) */}
                    <div className="lg:col-span-2">
                        <section className="bg-black/20 border border-gray-800/50 p-6 md:p-8 h-full">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-b border-gray-800 pb-4">
                                <Terminal className="text-neon-purple" />
                                MISSION LOGS
                            </h3>

                            <div className="space-y-8 relative before:absolute before:left-2 md:before:left-4 before:top-2 before:bottom-0 before:w-px before:bg-gray-800">
                                {PROJECTS.map((project, index) => (
                                    <div key={project.id} className="relative pl-8 md:pl-12 group">
                                        {/* Timeline Dot */}
                                        <div className={`
                                    absolute left-0 md:left-2 top-0 w-4 h-4 -translate-x-1/2 rounded-full border-2 
                                    ${index === 0 ? 'bg-neon-purple border-neon-purple shadow-[0_0_10px_#A855F7]' : 'bg-black border-gray-600 group-hover:border-neon-purple'}
                                    transition-colors
                                `}></div>

                                        <div className="mb-1 flex flex-wrap items-center gap-x-4">
                                            <span className="text-neon-purple font-bold">{project.date}</span>
                                            <span className={`text-[10px] px-2 py-0.5 border rounded ${project.status === 'ACTIVE' ? 'border-green-500 text-green-500' :
                                                    project.status === 'ARCHIVED' ? 'border-gray-500 text-gray-500' :
                                                        'border-red-500 text-red-500'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                                            {project.title}
                                        </h4>

                                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map(t => (
                                                <span key={t} className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="text-xs text-neon-purple hover:text-white flex items-center gap-1 transition-colors">
                                            ソースプロトコルを表示 <ExternalLink size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-4 border border-dashed border-gray-700 text-center text-xs text-gray-500">
                                END OF RECORDS // ACCESS LIMITED
                            </div>
                        </section>
                    </div>

                </div>

            </div>
        </main>
    );
}
