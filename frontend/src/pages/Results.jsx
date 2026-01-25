import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Code, BrainCircuit, Target, Sparkles, Shapes } from "lucide-react";
import { useEffect } from "react";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    useEffect(() => {
        if (!result) {
            console.warn("No result data found, redirecting...");
            const timer = setTimeout(() => navigate("/analyze"), 2000);
            return () => clearTimeout(timer);
        }
    }, [result, navigate]);

    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">DATA STREAM INTERRUPTED</h2>
                    <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">REDIRECTING TO ANALYZER LAB...</p>
                </motion.div>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { scale: 0.9, opacity: 0, y: 30 },
        show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    const score = Math.round(result.resume_score || 0);
    const isHighMatch = score >= 70;
    const isMidMatch = score >= 40;

    const resume_skills = Array.isArray(result.resume_skills) ? result.resume_skills : [];
    const missing_skills = Array.isArray(result.missing_skills) ? result.missing_skills : [];
    const edu_levels = Array.isArray(result.education_level) ? result.education_level : [];

    return (
        <div className="min-h-screen py-16 px-6 md:px-12 lg:px-20 relative z-10 overflow-x-hidden">
            <div className="max-w-[1800px] mx-auto">

                {/* GLOBAL HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 px-4">
                    <motion.button
                        whileHover={{ x: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/analyze")}
                        className="group flex items-center text-3xl font-black text-slate-500 hover:text-white transition-all uppercase tracking-tighter"
                    >
                        <ArrowLeft className="w-10 h-10 mr-4 text-cyan-400 group-hover:-translate-x-2 transition-transform" />
                        RETURN TO LAB
                    </motion.button>

                    <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl">
                        <div className="text-right">
                            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">SYSTEM STATUS</p>
                            <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">ANALYSIS COMPLETE</p>
                        </div>
                        <div className="h-10 w-1 bg-white/10"></div>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-black text-white uppercase tracking-tighter">TOKEN-{(Math.random() * 10000).toFixed(0)}</span>
                            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <motion.div
                    variants={container} initial="hidden" animate="show"
                    className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch"
                >

                    {/* LEFT COLUMN: IMPACT SCORE */}
                    <motion.div variants={item} className="xl:col-span-4 h-full">
                        <div className="bg-slate-900 border-4 border-white/5 rounded-[60px] p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden h-full">
                            <div className={`absolute inset-0 opacity-10 blur-[120px] transition-colors duration-1000 ${isHighMatch ? 'bg-emerald-500' : isMidMatch ? 'bg-amber-500' : 'bg-rose-500'}`} />

                            <div className="relative z-10 w-full">
                                <p className="text-2xl font-black text-slate-500 uppercase tracking-[0.4em] mb-16">MATCH INDEX</p>

                                <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mb-16">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 scale-110">
                                        <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="35" fill="transparent" className="text-slate-800/30" />
                                        <motion.circle
                                            cx="50%" cy="50%" r="45%"
                                            stroke="currentColor" strokeWidth="35" fill="transparent"
                                            className={isHighMatch ? "text-emerald-400" : isMidMatch ? "text-amber-400" : "text-rose-400"}
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: score / 100 }}
                                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.2, type: "spring" }}
                                            className="text-[120px] md:text-[150px] font-black text-white leading-none tracking-tighter"
                                        >
                                            {score}
                                        </motion.span>
                                        <span className="text-4xl font-black text-slate-600 mt-2 tracking-widest">%</span>
                                    </div>
                                </div>

                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}
                                    className={`text-6xl font-black tracking-tighter uppercase mb-2 ${isHighMatch ? 'text-emerald-400' : isMidMatch ? 'text-amber-400' : 'text-rose-400'}`}
                                >
                                    {isHighMatch ? 'ELITE GENIUS' : isMidMatch ? 'QUALIFIED' : 'OUTSIDE RANGE'}
                                </motion.h3>
                                <p className="text-xl font-bold text-slate-500 uppercase tracking-widest italic">Evaluation Sequence Complete</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/analyze")}
                                className="mt-20 w-full h-24 rounded-[30px] font-black text-3xl text-white shadow-2xl relative overflow-hidden group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-1000 ${isHighMatch ? 'from-emerald-500 to-green-600' : isMidMatch ? 'from-amber-400 to-orange-600' : 'from-rose-500 to-red-600'}`} />
                                <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-tighter">
                                    NEW SCAN
                                    <Shapes className="w-8 h-8" />
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: DATA MOSAIC */}
                    <div className="xl:col-span-8 flex flex-col gap-10">

                        {/* NAME & EDUCATION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                            <motion.div variants={item} className="bg-slate-900 border-4 border-white/5 rounded-[50px] p-12">
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="p-6 bg-cyan-500/10 rounded-[30px] shadow-[0_0_40px_rgba(6,182,212,0.1)]"><Award className="w-12 h-12 text-cyan-400" /></div>
                                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">ENTITY IDENTIFIED</h4>
                                </div>
                                <div className="space-y-12">
                                    <div>
                                        <span className="text-sm font-black text-slate-600 uppercase tracking-[0.4em] mb-4 block">IDENTIFIER</span>
                                        <p className="text-5xl md:text-6xl font-black text-white tracking-tighter break-words">{result.name || "UNIDENTIFIED"}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-black text-slate-600 uppercase tracking-[0.4em] mb-6 block">ACADEMIC PROFILE</span>
                                        <div className="flex flex-wrap gap-4">
                                            {edu_levels.length > 0 ? (
                                                edu_levels.map((e, i) => (
                                                    <span key={i} className="text-2xl font-black px-8 py-3 bg-white/5 text-slate-300 rounded-2xl border-2 border-white/10 uppercase tracking-tighter">{e}</span>
                                                ))
                                            ) : <span className="text-xl text-slate-700 italic font-black uppercase">NO DEGREE RECORDS FOUND</span>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={item} className="bg-[#020617] border-4 border-white/5 rounded-[50px] p-12 flex flex-col">
                                <div className="flex items-center gap-6 mb-12 border-b-4 border-white/5 pb-8">
                                    <Target className="w-12 h-12 text-purple-400" />
                                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">SKILLS MAPPING</h4>
                                </div>

                                <div className="space-y-12 flex-grow">
                                    <div>
                                        <div className="flex justify-between items-end mb-6">
                                            <span className="text-2xl font-black text-emerald-400 uppercase tracking-tighter italic">ALIGNED</span>
                                            <span className="text-5xl font-black text-white leading-none">{resume_skills.length}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {resume_skills.map((s, i) => (
                                                <span key={i} className="text-lg font-black px-6 py-2 bg-emerald-500/10 text-emerald-300 rounded-xl border border-emerald-500/30 uppercase tracking-tight">
                                                    {String(s)}
                                                </span>
                                            ))}
                                            {resume_skills.length === 0 && <span className="text-slate-600 font-black italic uppercase">EMPTY DATA STREAM</span>}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t-2 border-white/5">
                                        <div className="flex justify-between items-end mb-6">
                                            <span className="text-2xl font-black text-rose-500 uppercase tracking-tighter italic">GAPS DETECTED</span>
                                            <span className="text-5xl font-black text-white leading-none">{missing_skills.length}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {missing_skills.map((s, i) => (
                                                <span key={i} className="text-lg font-black px-6 py-2 bg-rose-500/10 text-rose-300 rounded-xl border border-rose-500/30 uppercase tracking-tight">
                                                    {String(s)}
                                                </span>
                                            ))}
                                            {missing_skills.length === 0 && <span className="text-4xl text-emerald-400 font-extrabold italic uppercase tracking-tighter">OPTIMAL MATCH FOUND</span>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* PROJECTS & PROFILES SECTION */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow items-stretch">
                            {result.projects && (
                                <motion.div variants={item} className={`bg-slate-900 border-4 border-white/5 rounded-[60px] p-12 relative overflow-hidden group ${result.coding_profiles?.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                                    <div className="absolute -top-10 -right-10 opacity-5 scale-[2] pointer-events-none transition-transform group-hover:scale-[2.2] duration-1000 rotate-12"><Shapes className="w-64 h-64 text-white" /></div>
                                    <h4 className="flex items-center text-3xl font-black text-cyan-400 mb-10 italic uppercase tracking-tighter">
                                        <BrainCircuit className="w-12 h-12 mr-6" /> PROJECT DOSSIER
                                    </h4>
                                    <p className="text-2xl md:text-3xl text-slate-300 leading-tight font-medium whitespace-pre-line tracking-tight max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                                        {result.projects}
                                    </p>
                                </motion.div>
                            )}

                            {result.coding_profiles?.length > 0 && (
                                <motion.div variants={item} className={`flex flex-col gap-8 ${result.projects ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
                                    {result.coding_profiles.map((p, i) => (
                                        <motion.a
                                            key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02, x: 10 }}
                                            className="group flex items-center p-8 md:p-10 bg-white/5 hover:bg-white/10 rounded-[40px] border-4 border-transparent hover:border-cyan-500/30 transition-all"
                                        >
                                            <div className="p-6 bg-[#020617] rounded-[25px] mr-8 group-hover:bg-cyan-500/10 transition-colors">
                                                <Code className="w-10 h-10 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h5 className="text-3xl md:text-4xl font-black text-white tracking-tighter truncate uppercase">{p.platform}</h5>
                                                <p className="text-lg text-slate-500 font-black mt-1 uppercase tracking-widest truncate">{p.details}</p>
                                            </div>
                                            <Sparkles className="w-10 h-10 text-slate-800 group-hover:text-cyan-400 transition-all ml-4" />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* FOOTER PADDING */}
                <div className="h-40" />
            </div>
        </div>
    );
};

export default Results;
