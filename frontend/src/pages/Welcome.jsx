import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, ArrowRight, ArrowRightCircle } from "lucide-react";

const Welcome = () => {
    const [showSplash, setShowSplash] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {showSplash ? (
                <motion.div
                    key="splash"
                    className="fixed inset-0 flex items-center justify-center bg-[#020617] z-[100]"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                        transition={{
                            duration: 1.2,
                            type: "spring",
                            damping: 10,
                            stiffness: 100
                        }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-[30px] opacity-70"
                            />
                            <div className="relative bg-[#020617] p-12 rounded-[40px] border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                                <Brain className="w-32 h-32 text-white" />
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12 text-center"
                        >
                            <h1 className="text-6xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                RESUME.AI
                            </h1>
                            <div className="h-1.5 w-48 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-transparent"></div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    key="welcome-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="min-h-screen flex flex-col items-center justify-center p-8 md:p-20 text-center relative z-10"
                >
                    <div className="w-full max-w-[1400px] flex flex-col items-center justify-center min-h-[85vh] ">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="px-8 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl mb-12"
                        >
                            <span className="text-xl md:text-2xl font-bold text-cyan-400 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 mr-3 text-yellow-400" />
                                REVOLUTIONIZING RECRUITMENT
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-7xl md:text-[140px] leading-[1] font-black tracking-tight mb-12 text-white"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                                AI POWERED
                            </span>
                            <br />
                            RESUME SCREENING
                        </motion.h1>

                        <motion.p
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-2xl md:text-4xl text-slate-400 max-w-5xl mx-auto leading-relaxed font-medium mb-16"
                        >
                            The definitive AI solution for modern recruiters. Precision, speed, and accuracy
                            redefined for the next generation of global talent.
                        </motion.p>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="w-full flex flex-col items-center"
                        >
                            <div className="mb-16 group">
                                <p className="text-2xl md:text-3xl font-bold text-slate-300">
                                    Created for Excellence by
                                </p>
                                <h3 className="text-4xl md:text-6xl font-black mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-500">
                                    SATHYA.T
                                </h3>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/analyze")}
                                className="group relative w-full h-[120px] max-w-xl text-3xl md:text-5xl font-black text-white rounded-[30px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(6,182,212,0.5)] transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient-x" />
                                <span className="relative z-10 flex items-center justify-center gap-6">
                                    GET STARTED
                                    <ArrowRightCircle className="w-10 h-10 md:w-16 md:h-16 group-hover:translate-x-3 transition-transform duration-500" />
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Welcome;
