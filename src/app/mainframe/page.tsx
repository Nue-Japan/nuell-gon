"use client";

import React, { useState, useRef, useEffect } from "react";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { Cpu, Archive, MessageSquare, Activity, ShieldCheck, Github, Globe, Linkedin, Terminal, Send, X as XIcon, Lock } from "lucide-react";

// --- Components ---

const GlobalUplinks = () => (
    <div className="bg-black/40 border border-gray-800 p-6 backdrop-blur-sm h-full flex flex-col justify-between group hover:border-neon-purple/50 transition-colors">
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe size={18} className="text-neon-purple" />
                    GLOBAL LINKS
                </h3>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-gray-400 mb-4">外部ネットワークへの接続</p>
        </div>

        <div className="flex gap-4">
            <a href="https://github.com/Nue-Japan" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 rounded border border-gray-700 hover:border-neon-purple hover:text-neon-purple transition-all">
                <Github size={20} />
            </a>
            <a href="https://x.com/Nue_nu8" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 rounded border border-gray-700 hover:border-blue-400 hover:text-blue-400 transition-all">
                {/* Simple X Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>
        </div>
    </div>
);

// --- Code Breaker Game Logic ---
const CodeBreaker = ({ onEnd }: { onEnd: (score: number) => void }) => {
    const [target, setTarget] = useState("");
    const [guesses, setGuesses] = useState<{ guess: string, hit: number, blow: number }[]>([]);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("GUESS THE 4-DIGIT CODE (0-9). NO DUPLICATES.");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // Generate random 4 digit code with unique numbers
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let code = "";
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * numbers.length);
            code += numbers[index];
            numbers.splice(index, 1);
        }
        setTarget(code);
        // console.log("Target:", code); // Cheating for debugging
    }, []);

    const handleGuess = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameOver) return;
        if (input.length !== 4 || new Set(input).size !== 4 || isNaN(Number(input))) {
            setMessage("INVALID INPUT. ENTER 4 UNIQUE DIGITS.");
            setInput("");
            return;
        }

        let hit = 0;
        let blow = 0;

        for (let i = 0; i < 4; i++) {
            if (input[i] === target[i]) {
                hit++;
            } else if (target.includes(input[i])) {
                blow++;
            }
        }

        const newGuesses = [...guesses, { guess: input, hit, blow }];
        setGuesses(newGuesses);
        setInput("");

        if (hit === 4) {
            setMessage(`ACCESS GRANTED. CODE BROKEN IN ${newGuesses.length} ATTEMPTS.`);
            setGameOver(true);
            onEnd(1000 - (newGuesses.length * 50));
        } else {
            setMessage(`HIT: ${hit} | BLOW: ${blow}`);
        }
    };

    return (
        <div className="font-mono text-xs p-2 bg-gray-900 rounded mb-2 border border-gray-700">
            <div className="text-neon-purple mb-2 font-bold flex items-center gap-2">
                <Lock size={12} />
                CODE BREAKER PROTOCOL
            </div>
            <div className="mb-2 text-gray-400">{message}</div>
            <div className="space-y-1 mb-2 max-h-32 overflow-y-auto">
                {guesses.map((g, i) => (
                    <div key={i} className="flex gap-4">
                        <span className="text-gray-500">{i + 1}.</span>
                        <span className="text-white tracking-widest">{g.guess}</span>
                        <span className="text-yellow-500">H:{g.hit}</span>
                        <span className="text-blue-500">B:{g.blow}</span>
                    </div>
                ))}
            </div>
            {!gameOver ? (
                <form onSubmit={handleGuess} className="flex gap-2">
                    <input
                        type="text"
                        maxLength={4}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-black border border-gray-600 focus:border-neon-purple outline-none px-2 py-1 flex-1 text-white"
                        placeholder="####"
                        autoFocus
                    />
                    <button type="submit" className="px-2 bg-gray-700 hover:bg-neon-purple text-white rounded">
                        ENTER
                    </button>
                </form>
            ) : (
                <button onClick={() => setGameOver(false) || window.location.reload()} className="text-neon-purple hover:underline">
                    SYSTEM RESET REQUIRED
                </button>
            )}
        </div>
    );
};

const SystemTerminal = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        "NUE-OS [Version 2.4.9]",
        "(c) Nue-Japan Corporation. All rights reserved.",
        "",
        "Type 'help' for a list of commands."
    ]);
    const [gameMode, setGameMode] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, gameMode]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();

        // Add command to history
        setHistory(prev => [...prev, `> ${input}`]);
        setInput("");

        if (cmd === "game") {
            setGameMode(true);
            setHistory(prev => [...prev, "INITIALIZING SECURITY PROTOCOL..."]);
            return;
        }

        let response = "";
        switch (cmd) {
            case "help":
                response = "Available commands: status, whoami, date, scan, clear, game";
                break;
            case "status":
                response = "SYSTEM INTEGRITY: 100% | THREAT LEVEL: LOW";
                break;
            case "whoami":
                response = "USER: Nue-Japan | CLEARANCE: ADMIN";
                break;
            case "date":
                response = new Date().toLocaleString();
                break;
            case "scan":
                response = "SCANNING... NO ANOMALIES DETECTED.";
                break;
            case "clear":
                setHistory([]);
                return;
            default:
                response = `Command not found: ${cmd}`;
        }
        setHistory(prev => [...prev, response]);
    };

    return (
        <div className="bg-black border border-gray-800 p-4 font-mono text-xs h-64 flex flex-col shadow-inner shadow-black/50">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2 text-gray-500">
                <Terminal size={12} />
                <span>SYSTEM_CONSOLE_V3</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 text-green-500 custom-scrollbar mb-2 relative">
                {history.map((line, i) => (
                    <div key={i} className="break-all">{line}</div>
                ))}

                {gameMode && (
                    <div className="mt-2 text-white">
                        <CodeBreaker onEnd={(score) => {
                            setGameMode(false);
                            setHistory(prev => [...prev, `GAME OVER. SCORE: ${score}`]);
                        }} />
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>

            {!gameMode && (
                <form onSubmit={handleCommand} className="flex gap-2 bg-gray-900/30 p-2 rounded">
                    <span className="text-neon-purple">{">"}</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-gray-300"
                        placeholder="Enter command..."
                        autoFocus
                    />
                </form>
            )}
        </div>
    );
}

// --- Snake Game Overlay ---
const SnakeGame = ({ onClose }: { onClose: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const gridSize = 20;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let loop: NodeJS.Timeout;

        const draw = () => {
            // Background
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Snake
            ctx.fillStyle = "#A855F7"; // Neon Purple
            snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2));

            // Food
            ctx.fillStyle = "#22c55e"; // Green
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        };

        const update = () => {
            if (gameOver) return;

            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Wall collision
            if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
                setGameOver(true);
                return;
            }

            // Self collision
            if (snake.some(part => part.x === head.x && part.y === head.y)) {
                setGameOver(true);
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                food = {
                    x: Math.floor(Math.random() * (canvas.width / gridSize)),
                    y: Math.floor(Math.random() * (canvas.height / gridSize))
                };
            } else {
                snake.pop();
            }

            draw();
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
            if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
            if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
            if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
        };

        document.addEventListener("keydown", handleKey);
        loop = setInterval(update, 100);

        return () => {
            clearInterval(loop);
            document.removeEventListener("keydown", handleKey);
        };
    }, [gameOver]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="bg-gray-900 p-4 border border-neon-purple rounded-lg shadow-[0_0_30px_#A855F7]">
                <div className="flex justify-between items-center mb-4 text-white">
                    <h2 className="text-xl font-bold font-mono">HIDDEN PROTOCOL: SNAKE</h2>
                    <button onClick={onClose}><XIcon /></button>
                </div>
                <canvas ref={canvasRef} width={400} height={400} className="border border-gray-700 bg-black mb-4"></canvas>
                <div className="flex justify-between items-center text-white font-mono">
                    <div>SCORE: {score}</div>
                    {gameOver && <div className="text-red-500 font-bold animate-pulse">GAME OVER</div>}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Use Arrow Keys to Move</p>
                {gameOver && (
                    <button
                        onClick={() => { setGameOver(false); setScore(0); }}
                        className="w-full mt-4 bg-neon-purple text-black font-bold py-2 rounded hover:bg-white transition-colors"
                    >
                        RESTART
                    </button>
                )}
            </div>
        </div>
    );
};

export default function MainframePage() {
    const [showSnake, setShowSnake] = useState(false);

    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')]">
            {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-end border-b border-neon-purple/30 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-neon-purple/10 rounded-full border border-neon-purple/20">
                            <ShieldCheck className="text-neon-purple animate-pulse" size={32} />
                        </div>
                        <div
                            className="cursor-pointer group"
                            onClick={() => setShowSnake(true)}
                        >
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-widest leading-none group-hover:text-neon-purple transition-colors duration-500">
                                NUE-MAINFRAME
                            </h1>
                            <p className="text-xs text-neon-purple font-mono mt-1 tracking-[0.3em] group-hover:tracking-[0.5em] transition-all">SECURE DASHBOARD // V2.0</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-xs mt-4 md:mt-0 bg-black/40 px-4 py-2 border border-gray-800 rounded">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-500">SECURE LINK ESTABLISHED</span>
                        </div>
                        <span className="text-gray-600">|</span>
                        <span className="text-neon-purple">USER: Nue-Japan</span>
                    </div>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {/* Row 1: Hero Specs (2 cols) & Core Status (1 col) */}
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-2 h-full">
                        <ServiceCard
                            title="Chimera Specs"
                            description="ローカルハードウェアの能力と互換性を詳細に分析します。Neural Coreによるシンクロ率測定。"
                            icon={Cpu}
                            status="READY"
                            href="/chimera-specs"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1 xl:col-span-2 h-full">
                        <ServiceCard
                            title="Core Systems"
                            description="バックエンドステータス: 安定 | API レイテンシ: 45ms | DB: 接続済み"
                            icon={Activity}
                            status="STABLE"
                            href="/core-systems"
                        />
                    </div>

                    {/* Row 2: Archives (1), Comm (1), Uplinks (1) + Flex */}
                    <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 h-full">
                        <ServiceCard
                            title="Nue Archives"
                            description="開発者の履歴、スキル、プロジェクトログ。"
                            icon={Archive}
                            status="ONLINE"
                            href="/archives"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 h-full">
                        <ServiceCard
                            title="Comm Link"
                            description="開発者への暗号化通信チャンネル。"
                            icon={MessageSquare}
                            status="ONLINE"
                            href="/comm-link"
                        />
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 xl:col-span-2 h-full">
                        <GlobalUplinks />
                    </div>

                    {/* Row 3: Terminal (Full Width) */}
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <SystemTerminal />
                    </div>

                </div>
            </div>
        </main>
    );
}
