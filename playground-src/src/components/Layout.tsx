import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Code2 className="w-8 h-8 text-indigo-500" />
              </motion.div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
                CodeCanvas
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/snippet/new"
                className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 duration-200"
              >
                New Playground
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex flex-col relative w-full">
        <Outlet />
      </main>
    </div>
  );
}
