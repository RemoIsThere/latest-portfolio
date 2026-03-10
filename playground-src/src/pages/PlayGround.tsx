import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Play, Code, Terminal, RefreshCw, Save, Share2 } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function PlayGround() {
  const [language, setLanguage] = useState<"javascript" | "python">(
    "javascript",
  );
  const [code, setCode] = useState<string>(
    'console.log("Hello from NodeJS");\n',
  );
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);

  // Initialize Pyodide on mount
  useEffect(() => {
    async function loadPyodide() {
      try {
        if ((window as any).loadPyodide) {
          const py = await (window as any).loadPyodide();
          setPyodide(py);
        }
      } catch (err) {
        console.error("Failed to load Pyodide:", err);
      }
    }
    loadPyodide();
  }, []);

  const runJavaScript = async (srcCode: string) => {
    return new Promise<string>((resolve) => {
      // Create a hidden iframe for sandboxed execution
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Connect iframe console to our output
      let outputBuffer = "";
      const originalLog = (iframe.contentWindow as any).console.log;
      const originalError = (iframe.contentWindow as any).console.error;

      (iframe.contentWindow as any).console.log = (...args: any[]) => {
        outputBuffer +=
          args
            .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
            .join(" ") + "\\n";
      };
      (iframe.contentWindow as any).console.error = (...args: any[]) => {
        outputBuffer +=
          "[Error]: " +
          args
            .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
            .join(" ") +
          "\\n";
      };

      try {
        // Execute the code inside the iframe context
        (iframe.contentWindow as any).eval(srcCode);
      } catch (e: any) {
        outputBuffer += "[Runtime Error]: " + e.message + "\\n";
      }

      // Cleanup
      document.body.removeChild(iframe);
      resolve(outputBuffer || "Execution finished with no output.");
    });
  };

  const runPython = async (srcCode: string) => {
    if (!pyodide) {
      return "[Error]: Pyodide runtime is not loaded yet. Please wait a moment.";
    }

    try {
      // Redirect python stdout to string
      pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      await pyodide.runPythonAsync(srcCode);

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");

      return (
        stdout + (stderr ? "\n[Errors]:\n" + stderr : "") ||
        "Execution finished with no output."
      );
    } catch (e: any) {
      return `[Runtime Error]: \n${e.toString()}`;
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    let finalOutput = "";

    // Simulate a tiny bit of latency for the UI spinner
    await new Promise((r) => setTimeout(r, 200));

    try {
      if (language === "javascript") {
        finalOutput = await runJavaScript(code);
      } else if (language === "python") {
        finalOutput = await runPython(code);
      }
      setOutput(finalOutput);
    } catch (err: any) {
      setOutput("Execution failed: \\n" + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Basic templates
    if (language === "javascript") {
      setCode('console.log("Hello from NodeJS");\\n');
      setOutput("");
    } else if (language === "python") {
      setCode('print("Hello from Python")\\n');
      setOutput("");
    }
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex-1 flex flex-col min-h-[calc(100vh-4rem)] p-4 gap-4 overflow-hidden rounded-xl border border-slate-800"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-[#060c17]">
        <Canvas>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full gap-4">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-950/80 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => setLanguage("javascript")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === "javascript" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Javascript
              </button>
              <button
                onClick={() => setLanguage("python")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${language === "python" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Python {pyodide === null && "(Loading...)"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors backdrop-blur-sm"
              title="Save Snippet"
            >
              <Save className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors backdrop-blur-sm"
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
              disabled={isRunning || (!pyodide && language === "python")}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all overflow-hidden relative shadow-lg"
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
                language={language}
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
                  <span className="text-slate-600">
                    Waiting for execution...
                  </span>
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
      </div>
    </motion.div>
  );
}
