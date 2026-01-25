import { motion } from "framer-motion";

const Background = () => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10 bg-[#020617]">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* Intense Animated Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, 90, 0],
                    x: [-50, 50, -50],
                    y: [-50, 50, -50]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-blue-600/30 rounded-full blur-[150px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, -90, 0],
                    x: [50, -50, 50],
                    y: [50, -50, 50]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-purple-600/30 rounded-full blur-[150px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.35, 0.15],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute bottom-[20%] left-[60%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[110px] mix-blend-screen"
            />
        </div>
    );
};

export default Background;
