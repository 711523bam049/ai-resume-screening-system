import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Award, Code, BrainCircuit, Target, Sparkles, Shapes, Zap, Activity, Shield, Loader2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;
    const [count, setCount] = useState(0);

    const score = Math.round(result?.resume_score || 0);

    useEffect(() => {
        if (!result) {
            const timer = setTimeout(() => navigate("/analyze"), 2000);
            return () => clearTimeout(timer);
        }

        // Animated counter effect
        const duration = 1200;
        const start = 0;
        const end = score;
        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [result, navigate, score]);

    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
                <div className="noise-overlay" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-10">
                    <Loader2 className="w-24 h-24 animate-spin mx-auto text-accent" />
                    <h2 className="text-mega gradient-text">STREAM.LOST</h2>
                </motion.div>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
    };

    const item = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    const isHighMatch = score >= 70;
    const isMidMatch = score >= 40;

    const resume_skills = Array.isArray(result.resume_skills) ? result.resume_skills : [];
    const missing_skills = Array.isArray(result.missing_skills) ? result.missing_skills : [];
    const edu_levels = Array.isArray(result.education_level) ? result.education_level : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-12 pb-32 px-8 z-10"
        >
            <div className="noise-overlay" />

            <div className="w-full max-w-[1800px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <motion.button
                            whileHover={{ x: -10 }}
                            onClick={() => navigate("/analyze")}
                            className="flex items-center gap-3 text-white/50 hover:text-white font-black uppercase tracking-widest transition-colors duration-300 mb-6"
                        >
                            <ArrowLeft className="w-6 h-6" /> Deactivate Lab
                        </motion.button>
                        <h1 className="text-mega leading-none tracking-[-0.05em] mb-2 uppercase">Analysis<br /><span className="gradient-text italic">Report</span></h1>
                    </div>

                    <div className="flex gap-4">
                        <div className="glass-panel px-8 py-4 rounded-3xl flex items-center gap-6 border-white/10">
                            <Activity className="w-8 h-8 text-accent animate-pulse" />
                            <div className="text-right">
                                <p className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase leading-none mb-1">Session ID</p>
                                <p className="text-xl font-black text-white italic">#TX-{Math.floor(Math.random() * 99999)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 xl:grid-cols-12 gap-10"
                >
                    {/* Main Score Module - Massive Impact */}
                    <motion.div variants={item} className="xl:col-span-5 relative group">
                        <div className="absolute -inset-4 bg-accent/20 blur-[80px] -z-10 rounded-[80px] group-hover:bg-accent/30 transition-all duration-700" />
                        <div className="glass-panel h-full rounded-[60px] p-16 flex flex-col items-center justify-center text-center border-white/20">
                            <p className="text-xs font-black tracking-[0.5em] text-white/40 uppercase mb-12">Composite Match Index</p>

                            <div className="relative mb-12 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-60px] border border-white/5 rounded-full"
                                />
                                <h2 className="text-[250px] font-black tracking-[-0.1em] text-white leading-none flex items-start">
                                    {count}<span className="text-4xl text-accent mt-16 font-black">%</span>
                                </h2>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                className={`px-10 py-4 rounded-full border-2 font-black text-2xl tracking-widest uppercase italic backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isHighMatch ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' :
                                    isMidMatch ? 'border-amber-400 text-amber-400 bg-amber-400/10' :
                                        'border-rose-500 text-rose-500 bg-rose-500/10'
                                    }`}
                            >
                                {isHighMatch ? 'Optimal Strategic Fit' : isMidMatch ? 'Viable Candidate' : 'Critical Divergence'}
                            </motion.div>

                            <p className="mt-12 text-white/20 font-bold max-w-xs text-sm uppercase tracking-widest leading-relaxed">
                                Neural network comparison complete. Dataset shows significant core competency alignment.
                            </p>
                        </div>
                    </motion.div>

                    {/* Secondary Data Mosaic */}
                    <div className="xl:col-span-7 flex flex-col gap-10">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <motion.div variants={item} className="glass-panel rounded-[50px] p-10 border-white/10 hover:border-accent/30 transition-all duration-500">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Shield className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Entity ID</h3>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">Full Legal Name</p>
                                    <p className="text-5xl font-black text-white tracking-[-0.04em] break-words uppercase">{result.name || "N/A"}</p>
                                </div>
                                <div className="mt-10 flex flex-wrap gap-3">
                                    {edu_levels.map((edu, i) => (
                                        <span key={i} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-black text-white/60 uppercase tracking-widest">{edu}</span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div variants={item} className="glass-panel rounded-[50px] p-10 border-white/10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                            <Target className="w-8 h-8 text-neon" />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter italic">Mapping</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-black text-white leading-none">{resume_skills.length + missing_skills.length}</p>
                                        <p className="text-[10px] font-black tracking-widest text-white/20 uppercase mt-1">Total</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(resume_skills.length / (resume_skills.length + missing_skills.length)) * 100}%` }}
                                            className="h-full bg-accent"
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs font-black tracking-widest">
                                        <span className="text-accent uppercase">ALIGNED: {resume_skills.length}</span>
                                        <span className="text-white/20 uppercase">MISSING: {missing_skills.length}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Skills Pod */}
                        <motion.div variants={item} className="glass-panel relative rounded-[60px] p-12 border-white/10 flex-grow overflow-hidden">
                            <div className="absolute top-[20%] right-[-10%] opacity-[0.02] text-[200px] font-black pointer-events-none -rotate-12 select-none">SKILLS</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                                <div>
                                    <h4 className="text-xs font-black tracking-[0.4em] text-emerald-400 uppercase mb-8 flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4" /> Validated Competencies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {resume_skills.map((s, i) => (
                                            <span key={i} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm font-bold text-emerald-300 transition-all hover:bg-emerald-500/20">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t md:border-t-0 md:border-l border-white/5 pt-12 md:pt-0 md:pl-12">
                                    <h4 className="text-xs font-black tracking-[0.4em] text-rose-500 uppercase mb-8 flex items-center gap-3">
                                        <Zap className="w-4 h-4" /> Strategic Gaps
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {missing_skills.map((s, i) => (
                                            <span key={i} className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-sm font-bold text-rose-300">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Utility Layer */}
                    <motion.div variants={item} className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Project Narrative */}
                        {result.projects && (
                            <div className="glass-panel rounded-[50px] p-12 border-white/10 relative group bg-white/[0.01]">
                                <div className="flex items-center gap-6 mb-10">
                                    <BrainCircuit className="w-10 h-10 text-accent group-hover:rotate-12 transition-transform" />
                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Project Dossier</h3>
                                </div>
                                <p className="text-2xl text-white/40 leading-[1.3] font-medium tracking-tight whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar italic">
                                    "{result.projects}"
                                </p>
                            </div>
                        )}

                        {/* Coding Profiles & CTA */}
                        <div className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {result.coding_profiles?.length > 0 ? (
                                    result.coding_profiles.map((p, i) => (
                                        <motion.a
                                            key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="glass-card p-8 rounded-[30px] flex items-center gap-6 border-white/5 hover:border-accent/30"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                                                <Code className="w-8 h-8 text-accent" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-lg font-black text-white tracking-tighter italic truncate uppercase">{p.platform}</p>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">{p.details || 'Profile Active'}</p>
                                            </div>
                                        </motion.a>
                                    ))
                                ) : (
                                    <div className="glass-panel p-8 rounded-[30px] flex items-center justify-center opacity-50 border-white/5">
                                        <p className="text-xs font-black tracking-widest text-white/20 uppercase">No Digital Footprint Detected</p>
                                    </div>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/analyze")}
                                className="btn-premium group w-full h-32 flex items-center justify-center gap-8 shadow-[0_0_100px_rgba(14,165,233,0.2)]"
                            >
                                <span className="text-4xl font-black tracking-tighter uppercase">Initiate New Scan</span>
                                <Shapes className="w-10 h-10 group-hover:rotate-90 transition-transform duration-700" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Results;

