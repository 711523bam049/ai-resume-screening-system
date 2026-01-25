import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, CheckCircle, BrainCircuit, Loader2, Sparkles, Shapes } from "lucide-react";

const Analyzer = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jobSkills, setJobSkills] = useState("");
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === "application/pdf") {
                setFile(droppedFile);
            } else {
                alert("Please upload a PDF file.");
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !jobSkills) return;

        setLoading(true);

        const skillsArray = jobSkills.split(",").map((s) => s.trim()).filter(s => s);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_skills", JSON.stringify(skillsArray));

        try {
            const res = await fetch("http://127.0.0.1:8000/match-resume/", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Analysis failed");

            const data = await res.json();

            setTimeout(() => {
                navigate("/results", { state: { result: data } });
            }, 2000);

        } catch (err) {
            console.error(err);
            alert("Analysis engine error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center py-20 px-6 relative z-10"
        >
            <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">

                {/* Title Section (Dominant Side) */}
                <div className="flex flex-col justify-center space-y-12">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-2xl md:text-3xl font-black text-cyan-400 uppercase tracking-widest mb-6 block">
                            Step 02: Configuration
                        </span>
                        <h2 className="text-7xl md:text-[100px] font-black leading-tight text-white">
                            ANALYSIS <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 italic">
                                PARAMETERS
                            </span>
                        </h2>
                        <p className="text-3xl text-slate-400 mt-8 font-medium leading-relaxed max-w-2xl">
                            Configure your screening criteria and upload the candidate dossier for immediate AI evaluation.
                        </p>
                    </motion.div>

                    {/* Analysis Stats / Features for visual padding */}
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { icon: Shapes, label: "Multi-PDF" },
                            { icon: BrainCircuit, label: "AI Engine" },
                            { icon: Sparkles, label: "99% Acc" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[30px] bg-white/5 border border-white/10 flex flex-col items-center gap-4 group hover:bg-white/10 transition-colors">
                                <item.icon className="w-12 h-12 text-cyan-400 group-hover:scale-125 transition-transform" />
                                <span className="text-lg font-bold text-slate-300">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input Controls (The Form) */}
                <div className="flex flex-col gap-10">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`
                relative h-[450px] rounded-[50px] border-4 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-12 overflow-hidden
                ${dragActive ? 'border-cyan-500 bg-cyan-500/15 shadow-[0_0_50px_rgba(6,182,212,0.3)]' : 'border-slate-800 bg-slate-800/60 hover:border-cyan-500/50 hover:bg-slate-800/80'}
                ${file ? 'border-green-500/50 bg-green-500/10' : ''}
              `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />

                        <AnimatePresence mode="wait">
                            {file ? (
                                <motion.div
                                    key="file-ready"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex flex-col items-center text-center gap-8"
                                >
                                    <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500/30">
                                        <FileText className="w-16 h-16 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black text-white px-4 break-all">{file.name}</h3>
                                        <p className="text-2xl text-green-400 font-bold mt-4 uppercase tracking-widest flex items-center justify-center gap-2">
                                            <CheckCircle className="w-8 h-8" /> Dossier Loaded
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-file"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex flex-col items-center text-center gap-8"
                                >
                                    <div className="w-40 h-40 rounded-full bg-cyan-500/10 flex items-center justify-center border-4 border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                                        <UploadCloud className="w-20 h-20 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black text-white">DRAG & DROP RESUME</h3>
                                        <p className="text-2xl text-slate-500 mt-4 font-bold">PDF FORMAT MANDATORY</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Target Skills Input */}
                    <div className="relative group flex-grow min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[50px] p-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                            <textarea
                                value={jobSkills}
                                onChange={(e) => setJobSkills(e.target.value)}
                                placeholder="INPUT TARGET SKILLS...&#10;EX: PYTHON, AWS, REACT, AI"
                                className="w-full h-full bg-[#020617] rounded-[45px] p-12 text-white placeholder-slate-700 focus:outline-none text-4xl font-black leading-tight uppercase resize-none"
                            />
                        </div>
                    </div>

                    {/* Run Analysis Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={loading || !file || !jobSkills}
                        className={`
                relative h-[120px] rounded-[30px] font-black text-4xl shadow-2xl transition-all
                ${loading || !file || !jobSkills
                                ? 'bg-slate-900 border-4 border-slate-800 text-slate-700 cursor-not-allowed'
                                : 'text-white overflow-hidden'
                            }
              `}
                    >
                        {!(loading || !file || !jobSkills) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient-x" />
                        )}

                        <span className="relative z-10 flex items-center justify-center gap-6">
                            {loading ? (
                                <motion.div
                                    key="loading-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex items-center gap-6"
                                >
                                    <Loader2 className="w-12 h-12 animate-spin text-cyan-200" />
                                    SYNTHESIZING...
                                </motion.div>
                            ) : (
                                <motion.div key="ready-btn" className="flex items-center gap-6">
                                    <BrainCircuit className="w-12 h-12" />
                                    EXECUTE ANALYSIS
                                </motion.div>
                            )}
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Analyzer;
