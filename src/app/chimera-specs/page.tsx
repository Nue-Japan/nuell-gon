"use client";

import React, { useState } from "react";
import { api, specs as outputSpecs } from "@/lib/api";
import { Cpu, Activity, Zap, AlertTriangle } from "lucide-react";

interface SpecsData {
    cpu_cores: number;
    memory_gb: number;
    gpu_score: number;
}

interface AnalysisResult {
    score: number;
    rank: string;
    metrics: string;
}

export default function ChimeraSpecsPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const [specs, setSpecs] = useState<SpecsData>({
        cpu_cores: 8,
        memory_gb: 16,
        gpu_score: 50,
    });

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSpecs(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await outputSpecs.analyze(specs);
            setResult(response.data);
        } catch (err) {
            setError("解析失敗: Neural Coreに接続できませんでした。");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-obsidian text-gray-300 p-4 md:p-8 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')]">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Panel: Inputs */}
                <div className="bg-black/80 border border-gray-800 p-6 backdrop-blur-sm relative">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Cpu className="text-neon-purple" />
                        ハードウェアパラメータ
                    </h2>

                    <div className="space-y-8">
                        {/* CPU IO */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-neon-purple">
                                <label>CPU コア数</label>
                                <span>{specs.cpu_cores}</span>
                            </div>
                            <input
                                type="range"
                                name="cpu_cores"
                                min="2" max="64" step="2"
                                value={specs.cpu_cores}
                                onChange={handleSliderChange}
                                className="w-full h-1 bg-gray-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neon-purple [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:box-shadow-[0_0_10px_#A855F7]"
                            />
                        </div>

                        {/* Memory IO */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-blue-500">
                                <label>メモリ (GB)</label>
                                <span>{specs.memory_gb} GB</span>
                            </div>
                            <input
                                type="range"
                                name="memory_gb"
                                min="4" max="128" step="4"
                                value={specs.memory_gb}
                                onChange={handleSliderChange}
                                className="w-full h-1 bg-gray-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>

                        {/* GPU IO */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-red-500">
                                <label>GPU スコア</label>
                                <span>{specs.gpu_score} PTS</span>
                            </div>
                            <input
                                type="range"
                                name="gpu_score"
                                min="0" max="100" step="1"
                                value={specs.gpu_score}
                                onChange={handleSliderChange}
                                className="w-full h-1 bg-gray-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full py-4 border border-neon-purple text-neon-purple font-black tracking-widest hover:bg-neon-purple hover:text-black transition-all duration-300 relative group overflow-hidden"
                        >
                            <span className="relative z-10 flex justify-center items-center gap-2">
                                {loading ? "シンクロ率計算中..." : <>シンクロテスト実行 <Zap size={18} /></>}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="bg-black/80 border border-gray-800 p-6 backdrop-blur-sm relative min-h-[400px] flex flex-col justify-center items-center text-center">

                    {loading && (
                        <div className="animate-pulse text-neon-purple font-mono">
                            <Activity className="w-16 h-16 mx-auto mb-4 animate-spin" />
                            <p>ニューラルパスウェイ解析中...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 border border-red-500/50 p-4 bg-red-500/10">
                            <AlertTriangle className="mx-auto mb-2" />
                            {error}
                        </div>
                    )}

                    {!loading && !result && !error && (
                        <div className="text-gray-600 font-mono text-sm">
                            <p>データ入力待機中...</p>
                        </div>
                    )}

                    {result && !loading && (
                        <div className="w-full animate-fade-in-up">
                            <div className="mb-2 text-gray-500 text-xs font-mono uppercase">シンクロ率 (Sync Score)</div>
                            <div className="text-6xl md:text-8xl font-black text-white mb-2 text-shadow-glow">
                                {result.score.toFixed(1)}
                            </div>

                            <div className={`
                        inline-block px-4 py-1 mb-8 text-sm font-bold border 
                        ${result.rank.includes("S-Class") ? "border-yellow-500 text-yellow-500 bg-yellow-500/10" :
                                    result.rank.includes("A-Class") ? "border-green-500 text-green-500 bg-green-500/10" :
                                        "border-gray-500 text-gray-500"}
                    `}>
                                {result.rank}
                            </div>

                            <div className="w-full border-t border-gray-800 pt-6">
                                <p className="text-xs text-gray-400 font-mono mb-2">評価メトリクス詳細</p>
                                <p className="text-neon-purple font-mono text-sm tracking-wider">
                                    {result.metrics}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Decorative */}
                    <div className="absolute top-0 right-0 p-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

            </div>
        </main>
    );
}
