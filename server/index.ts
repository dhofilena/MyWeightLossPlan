import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { identifyFood } from "./identify";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/identify", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Please provide a food description." });
      return;
    }
    const result = await identifyFood(query);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Identification failed.";
    res.status(400).json({ error: message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    aiMode: process.env.OPENAI_API_KEY ? "openai" : "smart-local",
  });
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
