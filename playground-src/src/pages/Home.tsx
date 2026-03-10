import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Terminal,
  Zap,
  Layers,
  Server,
  Shield,
  Cloud,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, duration: 0.5, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div className="relative w-full min-h-full flex flex-col items-center overflow-x-hidden scrollbar-hide bg-[#0f172a] text-slate-100">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-blue-500/10 rounded-full blur-[150px]" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center justify-center min-h-[85vh]">
        <motion.div
          className="text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              CodeCanvas v2.0 is Live
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]"
          >
            Cloud Coding, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 animate-gradient-x">
              Reimagined.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the ultimate developer playground. Write Java, Python,
            and Node.js with instant isolated execution infrastructure.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <Link to="/snippet/new" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 text-slate-900 hover:bg-white font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
              >
                <span>Start Building Free</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md text-white font-medium transition-colors border border-slate-700/50 flex items-center justify-center group"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- MARQUEE SECTION (MagicUI Pattern) --- */}
      <section className="relative z-10 w-full py-16 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm overflow-hidden flex flex-col items-center">
        <p className="text-sm font-medium text-slate-500 tracking-widest uppercase mb-8">
          Powered by Modern Technology
        </p>
        <div className="flex space-x-12 animate-marquee whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500">
          {/* Doubled for seamless scrolling effect */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-16 items-center">
              <span className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-400">
                  J
                </div>
                Java 17+
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center text-yellow-400">
                  P
                </div>
                Python 3.10+
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400">
                  N
                </div>
                Node.js
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400">
                  D
                </div>
                Docker Engine
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-500/20 rounded flex items-center justify-center text-sky-400">
                  R
                </div>
                React
              </span>
            </div>
          ))}
        </div>
        {/* CSS Marquee Keyframes require definition, added inline via tailwind arbitrarily or index.css. We use raw CSS class here which needs adding to index.css! */}
      </section>

      {/* --- BENTO GRID SECTION (Shadcn UI Pattern) --- */}
      <section
        id="features"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Engineered for speed.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to write, test, and share code instantly without
            configuring a local environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Bento Item 1 - Large */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-8 hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
              <Terminal className="w-48 h-48 text-indigo-400" />
            </div>
            <div className="relative z-20">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Zero-Latency Execution
              </h3>
              <p className="text-lg text-slate-400 max-w-md">
                Our backend architecture pipes standard output directly back to
                your secure session instantly.
              </p>
            </div>
            {/* Magic Border Beam effect */}
            <div className="absolute inset-0 rounded-3xl border border-transparent [background:linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.3)_50%,transparent_75%,transparent_100%)_0_0/400%_400%] group-hover:animate-[bg-pan_3s_linear_infinite] pointer-events-none" />
          </div>

          {/* Bento Item 2 */}
          <div className="group relative overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-8 hover:border-emerald-500/50 transition-all duration-500">
            <div className="relative z-20 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Secure Sandbox
              </h3>
              <p className="text-slate-400 flex-1">
                Isolated environments enforce memory timeouts and strict
                containerization.
              </p>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="group relative overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-8 hover:border-blue-500/50 transition-all duration-500">
            <div className="relative z-20 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Multi-Paradigm
              </h3>
              <p className="text-slate-400 flex-1">
                Object-oriented Java, scripting in Python, or async Node logic
                all supported natively.
              </p>
            </div>
          </div>

          {/* Bento Item 4 - Wide */}
          <div className="md:col-span-3 group relative overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-8 hover:border-purple-500/50 transition-all duration-500 flex items-center gap-8">
            <div className="relative z-20 flex-1">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stateful Workspaces
              </h3>
              <p className="text-slate-400 max-w-lg">
                Your code is automatically sync'd and sharable via instantaneous
                deep-link snapshots generated on demand.
              </p>
            </div>
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="w-full h-32 bg-slate-900 rounded-xl border border-slate-700 flex items-center p-4 gap-4 overflow-hidden">
                <Server className="text-slate-500 w-8 h-8" />
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse delay-75" />
                  <div className="h-2 w-5/6 bg-slate-800 rounded animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full border-t border-slate-800 py-12 text-center text-slate-500 mt-auto z-10">
        <p>© 2026 CodeCanvas Playground. Built with modern UI patterns.</p>
      </footer>
    </div>
  );
}
