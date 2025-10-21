import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { handleDemo } from "./routes/demo";
import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "./routes/pedidos";

// Setup para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API endpoints
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/pedidos", getPedidos);
  app.post("/api/pedidos", createPedido);
  app.patch("/api/pedidos/:id", updatePedido);
  app.delete("/api/pedidos/:id", deletePedido);

  // In production, serve the SPA fallback for non-API routes
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../dist/spa");

    // Serve static files
    app.use(express.static(distPath));

    // SPA fallback: serve index.html for all non-API routes
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  return app;
}
