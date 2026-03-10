import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Play, Code, Terminal, RefreshCw, Save, Share2 } from "lucide-react";

export default function PlayGround() {
  const [language, setLanguage] = useState<"java" | "javascript" | "python">(
    "java",
  );
  const [code, setCode] = useState<string>(
    'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}',
  );
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);

    try {
      const response = await fetch("http://localhost:7000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      setOutput(data.output || data.error);
    } catch (err: any) {
      setOutput("Failed to connect to execution server.\n" + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Basic templates
    if (language === "java") {
      setCode(
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}\n',
      );
      setOutput("");
    } else if (language === "javascript") {
      setCode('console.log("Hello from NodeJS");\n');
      setOutput("");
    } else if (language === "python") {
      setCode('print("Hello from Python")\n');
      setOutput("");
    }
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-[#0f172a] p-4 gap-4"
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 rounded-lg p-1">
            <button
              onClick={() => setLanguage("java")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === "java" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Java
            </button>
            <button
              onClick={() => setLanguage("javascript")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === "javascript" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Node.js
            </button>
            <button
              onClick={() => setLanguage("python")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === "python" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Python
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
            title="Save Snippet"
          >
            <Save className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium text-white transition-all overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Running</span>
                </motion.div>
              ) : (
                <motion.div
                  key="run"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Run Code</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Editor Panel */}
        <motion.div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-colors group relative shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-black/20 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <Code className="w-4 h-4" />
            <span>Editor - {language}</span>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={language === "java" ? "java" : language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                padding: { top: 16 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                formatOnPaste: true,
                suggest: { showWords: false },
              }}
            />
          </div>
        </motion.div>

        {/* Output/Preview Panel */}
        <motion.div className="flex-1 flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors relative">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <Terminal className="w-4 h-4" />
            <span>Terminal Output</span>
          </div>
          <div className="flex-1 bg-white relative">
            <div className="w-full h-full bg-[#0d1117] text-slate-300 font-mono p-4 overflow-auto text-sm whitespace-pre-wrap">
              {output || (
                <span className="text-slate-600">Waiting for execution...</span>
              )}
            </div>

            {/* Overlay Loader */}
            <AnimatePresence>
              {isRunning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center z-10"
                >
                  <div className="flex flex-col items-center text-indigo-400 gap-4">
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Code className="w-12 h-12" />
                    </motion.div>
                    <motion.div
                      key="dots"
                      className="font-mono text-xl overflow-hidden whitespace-nowrap border-r-2 border-indigo-400 pr-1 animate-pulse"
                    >
                      Executing...
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
