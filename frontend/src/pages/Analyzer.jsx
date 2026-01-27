import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, CheckCircle, BrainCircuit, Loader2, Sparkles, Shapes, ArrowLeft } from "lucide-react";

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
            }, 600);

        } catch (err) {
            console.error(err);
            alert("Analysis engine error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex flex-col pt-12 pb-20 px-8 z-10"
        >
            {/* Header / Nav */}
            <div className="w-full max-w-[1800px] mx-auto flex justify-between items-center mb-16">
                <motion.button
                    whileHover={{ x: -10 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 text-white/50 hover:text-white font-black uppercase tracking-widest transition-colors duration-300"
                >
                    <ArrowLeft className="w-6 h-6" /> Back to Nexus
                </motion.button>
                <div className="flex gap-4">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`h-1.5 w-12 rounded-full ${step === 2 ? 'bg-accent shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[1800px] mx-auto flex-grow grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-stretch">

                {/* Left Side: Parameters & Context */}
                <div className="flex flex-col justify-center gap-12">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h2 className="text-[120px] font-black leading-[0.8] mb-10 tracking-[-0.05em]">
                            CONFIG.<br />
                            <span className="gradient-text">TARGET</span>
                        </h2>
                        <div className="flex gap-6 mb-12">
                            <div className="h-20 w-1.5 bg-accent" />
                            <p className="text-3xl text-white/30 font-medium leading-[1.1] max-w-md">
                                Define the ideal candidate profile and feed the neural network your dossier.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: "ENGINE", value: "CORE.V4", sub: "Neural Processing" },
                            { label: "PRECISION", value: "99.2%", sub: "Validation Rate" }
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-8 rounded-[30px] border-white/5">
                                <p className="text-xs font-black tracking-[0.3em] text-white/20 uppercase mb-2">{stat.label}</p>
                                <p className="text-4xl font-black text-white italic">{stat.value}</p>
                                <p className="text-sm text-accent font-bold mt-1 uppercase tracking-widest">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Command Center Pod */}
                <div className="relative flex flex-col gap-8">
                    {/* Background glow for the pod */}
                    <div className="absolute -inset-10 bg-accent/20 blur-[120px] -z-10 rounded-full" />

                    <div className="glass-panel flex-grow rounded-[60px] p-10 border-white/20 flex flex-col gap-8">
                        {/* File Upload Area */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`
                                relative flex-shrink-0 min-h-[300px] rounded-[40px] border-2 border-dashed transition-all duration-500 flex items-center justify-center p-8 overflow-hidden cursor-pointer
                                ${dragActive ? 'border-accent bg-accent/20' : 'border-white/10 bg-white/[0.02] hover:border-white/30'}
                                ${file ? 'border-blue-400/50 bg-blue-400/10' : ''}
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
                                        key="file-active"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center gap-6"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-blue-400/20 flex items-center justify-center border-2 border-blue-400/50">
                                            <FileText className="w-10 h-10 text-blue-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-white">{file.name}</p>
                                            <p className="text-blue-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2">
                                                <CheckCircle className="w-5 h-5" /> DOSSIER LOCKED
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="no-file"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="flex flex-col items-center gap-6"
                                    >
                                        <div className="w-28 h-28 rounded-[30px] bg-white/5 flex items-center justify-center border border-white/10">
                                            <UploadCloud className="w-12 h-12 text-white/20" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-white">DROP DOSSIER</p>
                                            <p className="text-white/20 font-bold uppercase tracking-widest mt-1 italic">PDF format required</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Skills Input Area */}
                        <div className="flex-grow flex flex-col gap-4">
                            <label className="text-xs font-black tracking-[0.4em] text-white/30 uppercase pl-4">Criteria Parameters</label>
                            <div className="relative flex-grow">
                                <textarea
                                    value={jobSkills}
                                    onChange={(e) => setJobSkills(e.target.value)}
                                    placeholder="INPUT TARGET SKILLS... (EX: PYTHON, AWS, SQL)"
                                    className="w-full h-full min-h-[250px] bg-white/[0.03] rounded-[40px] border border-white/5 p-10 text-white placeholder-white/10 focus:outline-none focus:border-accent/30 text-3xl font-black leading-tight uppercase resize-none transition-all"
                                />
                                <div className="absolute top-8 right-8">
                                    <Shapes className="w-10 h-10 text-white/5" />
                                </div>
                            </div>
                        </div>

                        {/* Execute Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={loading || !file || !jobSkills}
                            className={`
                                btn-premium w-full min-h-[120px] flex items-center justify-center gap-6 shadow-[0_20px_50px_rgba(14,165,233,0.3)]
                                ${loading || !file || !jobSkills ? 'grayscale opacity-50 cursor-not-allowed transform-none' : ''}
                            `}
                        >
                            <span className="text-4xl md:text-5xl font-black tracking-tighter">
                                {loading ? 'SYNTHESIZING...' : 'EXECUTE SCAN'}
                            </span>
                            {loading ? (
                                <Loader2 className="w-10 h-10 md:w-14 md:h-14 animate-spin" />
                            ) : (
                                <BrainCircuit className="w-10 h-10 md:w-14 md:h-14" />
                            )}
                        </motion.button>
                    </div>

                    {/* Meta Info */}
                    <div className="flex justify-between items-center px-10 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
                        <p>SECURE TRANSMISSION ACTIVE</p>
                        <p>ENCRYPTION: AES-256-BIT</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analyzer;

