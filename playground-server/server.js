import express from "express";
import cors from "cors";
import { exec } from "child_process";
import util from "util";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = util.promisify(exec);

const app = express();
app.use(cors());
app.use(express.json());

// Mock DB placeholder
let snippets = new Map();

// Temp directory for code execution
const TEMP_DIR = path.join(__dirname, "temp");
fs.ensureDirSync(TEMP_DIR);

// --- Auth Endpoints ---
app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ message: "User registered (Mocked)" });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ token: "mock-jwt-token-123" });
});

// --- Snippet Endpoints ---
app.post("/api/snippets", (req, res) => {
  const { title, language, code, css } = req.body;
  const id = Math.random().toString(36).substring(2, 8);
  snippets.set(id, { id, title, language, code, css, createdAt: new Date() });
  res.status(201).json({ id });
});

app.get("/api/snippets/:id", (req, res) => {
  const snippet = snippets.get(req.params.id);
  if (!snippet) return res.status(404).json({ error: "Not found" });
  res.json(snippet);
});

app.delete("/api/snippets/:id", (req, res) => {
  snippets.delete(req.params.id);
  res.json({ success: true });
});

// --- Code Execution Endpoint ---
app.post("/api/run", async (req, res) => {
  const { language, code } = req.body;

  const executionId = uuidv4();
  const dirPath = path.join(TEMP_DIR, executionId);
  await fs.ensureDir(dirPath);

  const fileExtension =
    language === "python" ? "py" : language === "java" ? "java" : "js";
  const fileName = language === "java" ? "Main.java" : `index.${fileExtension}`;
  const filePath = path.join(dirPath, fileName);

  try {
    // Write code to a temporary file
    await fs.writeFile(filePath, code);

    let command = "";

    // As the environment does not have docker, we are directly executing the code for now with a timeout.
    // WARNING: This is NOT secure for a production environment! In production use Docker.
    if (language === "python") {
      command = `python "${filePath}"`;
    } else if (language === "javascript") {
      command = `node "${filePath}"`;
    } else if (language === "java") {
      // In Java 11+, we can just execute the .java file directly
      command = `java "${fileName}"`;
    } else {
      return res.status(400).json({ error: "Unsupported language" });
    }

    try {
      // Run from within the temporary directory
      const { stdout, stderr } = await execAsync(command, {
        timeout: 10000,
        cwd: dirPath,
      }); // 10 second timeout

      let output = stdout;
      if (stderr) {
        output += `\nErrors:\n${stderr}`;
      }

      res.json({ output: output || "Execution finished with no output." });
    } catch (execError) {
      if (execError.killed) {
        return res.json({
          output: "Error: Execution timed out (Limit: 10 seconds).",
        });
      }
      res.json({ output: `Error: ${execError.stderr || execError.message}` });
    }
  } catch (err) {
    res.status(500).json({ error: `Server Error: ${err.message}` });
  } finally {
    // Cleanup temporary directory
    try {
      await fs.remove(dirPath);
    } catch (e) {
      console.error("Failed to cleanup temp dir:", e);
    }
  }
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
