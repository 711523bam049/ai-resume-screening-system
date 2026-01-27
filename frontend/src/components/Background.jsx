import { motion } from "framer-motion";

const Background = () => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10 bg-[#020617]">
            {/* Noise Texture Overlay */}
            <div className="noise-overlay" />

            {/* Background Grid Accent - Super Subtle */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Main Light Flares */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-[100vw] h-[100vh] bg-blue-500 rounded-full blur-[160px] mix-blend-screen overflow-hidden"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.15, 0.05],
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -right-[10%] w-[120vw] h-[100vh] bg-purple-600 rounded-full blur-[180px] mix-blend-screen overflow-hidden"
            />

            {/* Sharp Accent Flares */}
            <motion.div
                animate={{
                    opacity: [0, 0.3, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] w-[600px] h-[200px] bg-cyan-400/20 blur-[100px] -rotate-45"
            />

            <motion.div
                animate={{
                    opacity: [0, 0.2, 0],
                    rotate: [0, -45, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute bottom-[30%] left-[15%] w-[500px] h-[150px] bg-indigo-500/20 blur-[120px] rotate-12"
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]"></div>
        </div>
    );
};

export default Background;

