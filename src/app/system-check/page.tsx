"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LogEntry {
    id: number;
    message: string;
    timestamp: string;
    type: "info" | "success" | "warning";
}

export default function SystemCheckPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    // Diagnostic steps configuration
    const steps = [
        { progress: 10, message: "Initializing core systems...", duration: 800 },
        { progress: 30, message: "Bypassing biometric firewalls...", duration: 1200 },
        { progress: 45, message: "Decrypting neural link parameters...", duration: 1000 },
        { progress: 60, message: "Establishing handshake with NUE-NET...", duration: 1500 },
        { progress: 85, message: "Verifying cognitive resonance...", duration: 1200 },
        { progress: 100, message: "COMPATIBILITY CONFIRMED. ACCESS GRANTED.", duration: 800, type: "success" },
    ];

    useEffect(() => {
        let currentStep = 0;

        const executeStep = async () => {
            if (currentStep >= steps.length) {
                setIsComplete(true);
                return;
            }

            const step = steps[currentStep];
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

            // Add log
            setLogs((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    message: step.message,
                    timestamp: timeString,
                    type: (step.type as any) || "info",
                },
            ]);

            // Animate progress to target
            const targetProgress = step.progress;
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev < targetProgress) return prev + 1;
                    clearInterval(progressInterval);
                    return prev;
                });
            }, step.duration / (targetProgress - (currentStep > 0 ? steps[currentStep - 1].progress : 0)));

            // Wait for duration then next step
            setTimeout(() => {
                clearInterval(progressInterval); // Ensure cleanup
                setProgress(targetProgress); // Ensure final value
                currentStep++;
                executeStep();
            }, step.duration);
        };

        // Start delay
        const initialTimer = setTimeout(executeStep, 500);
        return () => clearTimeout(initialTimer);
    }, []);

    return (
        <main className="min-h-screen bg-obsidian text-neon-purple font-mono flex items-center justify-center p-4 relative overflow-hidden">
            {/* Scanlines Effect Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent bg-[length:100%_4px] animate-scanline"></div>

            <div className="w-full max-w-2xl border border-neon-purple/50 bg-black/80 backdrop-blur-sm p-6 md:p-10 relative z-20 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                {/* Header */}
                <header className="flex justify-between items-end mb-8 border-b border-neon-purple/30 pb-2">
                    <h1 className="text-xl md:text-2xl font-bold tracking-widest text-shadow-glow">DIAGNOSTIC_TOOL_V1.0</h1>
                    <span className="text-xs text-gray-400 animate-pulse">STATUS: {isComplete ? "CONNECTED" : "SCANNING"}</span>
                </header>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-2 w-full bg-gray-900 border border-neon-purple/30 overflow-hidden">
                        <div
                            className="h-full bg-neon-purple transition-all duration-100 ease-linear shadow-[0_0_10px_#A855F7]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                        <span>PROGRESS</span>
                        <span>{progress}%</span>
                    </div>
                </div>

                {/* Log Window */}
                <div className="h-64 overflow-y-auto font-xs border border-gray-800 bg-black/50 p-4 mb-8 custom-scrollbar">
                    {logs.map((log) => (
                        <div key={log.id} className={`mb-2 font-mono ${log.type === 'success' ? 'text-green-500 font-bold' : 'text-neon-purple/80'}`}>
                            <span className="text-gray-600 mr-2">[{log.timestamp}]</span>
                            <span>{log.message}</span>
                        </div>
                    ))}
                    {!isComplete && (
                        <div className="animate-pulse">_</div>
                    )}
                </div>

                {/* Success Action */}
                {isComplete && (
                    <div className="flex justify-center animate-fade-in-up">
                        <button
                            onClick={() => router.push("/mainframe")}
                            className="px-8 py-3 bg-neon-purple text-black font-bold hover:bg-white hover:text-neon-purple transition-colors duration-300 shadow-[0_0_15px_#A855F7]"
                        >
                            ENTER MAINFRAME
                        </button>
                    </div>
                )}

                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-purple"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-purple"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-purple"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-purple"></div>
            </div>
        </main>
    );
}
