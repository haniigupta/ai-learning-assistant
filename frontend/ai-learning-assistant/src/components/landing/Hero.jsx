import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const navigate = useNavigate();

    return (

        <section className="relative overflow-hidden">

            {/* Glow */}

            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full" />

            <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-300 text-sm mb-8">

                            AI Powered Learning Platform

                        </div>

                        <h1 className="text-6xl font-bold text-white leading-tight">

                            Turn Any Documents Into

                            <span className="block text-emerald-400">

                                An AI Study Partner

                            </span>

                        </h1>

                        <p className="text-slate-400 text-lg mt-8 max-w-xl">

                            Upload PDFs, chat with AI, generate flashcards,
                            create quizzes and learn faster than ever.

                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">

                            <button
                                onClick={() => navigate('/register')}
                                className="group px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center gap-2"
                            >

                                Get Started

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition"
                                />

                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="px-7 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                            >
                                Sign In
                            </button>

                            <div className="flex flex-wrap items-center gap-6 mt-10 text-slate-400 text-sm">

                                <span>📄 AI Document Chat</span>

                                <span>🧠 Flashcards</span>

                                <span>🎯 Quiz Generation</span>

                                <span>⚡ Instant Summaries</span>

                            </div>

                        </div>

                    </div>

                    {/* Right Mockup */}

                    <div>

                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-8 shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <p className="text-slate-400 text-sm">
                                        AI Document Chat
                                    </p>

                                    <h3 className="text-white font-semibold mt-1">
                                        DSA Notes.pdf
                                    </h3>

                                </div>

                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />

                            </div>

                            {/* User Message */}

                            <div className="flex justify-end mb-4">

                                <div className="bg-emerald-500 text-white px-4 py-3 rounded-2xl max-w-[80%]">

                                    What is Dynamic Programming?

                                </div>

                            </div>

                            {/* AI Response */}

                            <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700">

                                <p className="text-emerald-400 text-sm mb-2">
                                    AI Response
                                </p>

                                <p className="text-slate-300 text-sm leading-relaxed">

                                    Dynamic Programming solves problems by
                                    breaking them into overlapping subproblems
                                    and storing previously computed results.

                                </p>

                            </div>

                            {/* Bottom Stats */}

                            <div className="grid grid-cols-3 gap-3 mt-6">

                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">

                                    <p className="text-emerald-300 text-xs">
                                        Summary
                                    </p>

                                    <p className="text-white font-bold mt-1">
                                        ✓
                                    </p>

                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">

                                    <p className="text-blue-300 text-xs">
                                        Cards
                                    </p>

                                    <p className="text-white font-bold mt-1">
                                        20
                                    </p>

                                </div>

                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">

                                    <p className="text-purple-300 text-xs">
                                        Quiz
                                    </p>

                                    <p className="text-white font-bold mt-1">
                                        Ready
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>

        </section>

    );
};

export default Hero;