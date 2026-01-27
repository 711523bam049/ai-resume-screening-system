import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";

const Welcome = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowSplash(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {showSplash ? (
                <motion.div
                    key="splash"
                    className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617] z-[100]"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative flex flex-col items-center"
                    >
                        <div className="relative mb-12">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-60px] rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-400 blur-[40px] opacity-50"
                            />
                            <div className="relative glass-panel p-10 rounded-[40px] border border-white/20">
                                <Brain className="w-24 h-24 text-white animate-pulse" />
                            </div>
                        </div>

                        <h1 className="text-mega font-black gradient-text tracking-[ -0.08em] italic leading-none">
                            AI.CORE
                        </h1>

                        <div className="w-64 h-1 bg-white/10 rounded-full mt-12 overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-4 text-white/40 font-bold tracking-widest text-sm uppercase">
                            Initializing Advanced Neural Engines
                        </p>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    key="welcome-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-6 z-10"
                >
                    {/* Hero Section */}
                    <div className="w-full max-w-[1600px] flex flex-col items-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl mb-10"
                        >
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-sm font-black tracking-[0.2em] text-white uppercase">The Next Frontier of Talent Acquisition</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-mega gradient-text leading-[0.85] mb-4">
                                BEYOND<br />
                                HUMAN LIMITS
                            </h1>
                            <p className="text-super text-white/20 -mt-4 opacity-50">SCREENS UNLIMITED POTENTIAL</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-24">
                            {[
                                { icon: Zap, title: "INSTANT SCAN", desc: "Process thousands of resumes in milliseconds." },
                                { icon: ShieldCheck, title: "UNBIASED AI", desc: "Fair assessment based purely on talent and data." },
                                { icon: Globe, title: "GLOBAL REACH", desc: "Scale your recruitment across borders seamlessly." }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="glass-card p-10 rounded-[30px]"
                                >
                                    <feature.icon className="w-12 h-12 text-accent mb-6" />
                                    <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                                    <p className="text-white/40 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Integrated Author & CTA Section */}
                        <div className="w-full flex flex-col items-center gap-12 border-t border-white/5 pt-20">
                            <div className="flex flex-col items-center">
                                <p className="text-white/30 font-bold tracking-widest uppercase text-sm mb-4">Architected & Engineered By</p>
                                <motion.h2
                                    whileHover={{ scale: 1.05 }}
                                    className="text-6xl md:text-8xl font-black text-white hover:text-accent transition-colors duration-500 cursor-default"
                                >
                                    SATHYA.T
                                </motion.h2>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/analyze")}
                                className="btn-premium group w-full max-w-2xl min-h-[140px] flex items-center justify-center gap-8 shadow-[0_0_80px_rgba(14,165,233,0.3)]"
                            >
                                <span className="text-4xl md:text-6xl font-black tracking-tighter">LAUNCH SYSTEM</span>
                                <ArrowRight className="w-10 h-10 md:w-16 md:h-16 group-hover:translate-x-4 transition-transform duration-500" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Background Subtle Elements */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Welcome;

