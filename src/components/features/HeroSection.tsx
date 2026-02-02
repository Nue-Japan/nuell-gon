"use client";

import React, { useEffect, useState } from "react";
import { ActionButton } from "@/components/ui/ActionButton";

export const HeroSection = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Mouse parallax effect for background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setOffset({
                x: (e.clientX - window.innerWidth / 2) * 0.02,
                y: (e.clientY - window.innerHeight / 2) * 0.02,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-obsidian text-white">
            {/* Background Particles (Simplified CSS/Div approach for now) */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, #1a1a1a 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
            />

            {/* Main Content */}
            <div className="z-10 text-center flex flex-col items-center gap-8">
                <h1
                    className="text-6xl md:text-9xl font-black tracking-tighter animate-glitch"
                    data-text="NUE-JAPAN"
                >
                    <span className="relative inline-block text-white mix-blend-difference">
                        NUE-JAPAN
                    </span>
                </h1>

                <p className="text-sm md:text-xl tracking-[0.5em] text-gray-400 uppercase animate-fade-in-up">
                    The Chimera of Data & Logic
                </p>

                <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <ActionButton onClick={() => console.log("System Check Initiated")} />
                </div>
            </div>

            {/* Decorative Vertical Text */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block select-none">
                <div className="writing-vertical-rl font-serif text-deep-crimson/50 text-xs tracking-widest h-64 flex justify-between">
                    <span>仮想現実</span>
                    <span>電子幽霊</span>
                    <span>技術的特異点</span>
                </div>
            </div>

            <div className="absolute right-8 bottom-12 hidden md:block select-none">
                <div className="font-mono text-[10px] text-gray-600 tracking-widest">
                    SYSTEM_STATUS: ONLINE<br />
                    VERSION: 0.1.0-ALPHA
                </div>
            </div>
        </section>
    );
};
