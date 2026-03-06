import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { sendContactEmail } from "./contactEmail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, services } = req.body || {};
      if (!name || !email || !phone || !message || !Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ success: false, error: "Invalid form payload" });
      }

      await sendContactEmail({ name, email, phone, message, services });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
