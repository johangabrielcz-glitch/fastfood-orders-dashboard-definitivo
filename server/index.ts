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

export function createServer() {
  const app = express();

  // --- Middlewares ---
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- API Routes ---
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // --- Pedidos API ---
  app.get("/api/pedidos", getPedidos);
  app.post("/api/pedidos", createPedido);
  app.patch("/api/pedidos/:id", updatePedido);
  app.delete("/api/pedidos/:id", deletePedido);

  // --- Static Frontend (Vite build) ---
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const staticPath = path.join(__dirname, "../../dist/spa");
  app.use(express.static(staticPath));

  // --- Catch-all route (for SPA) ---
  app.all("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}
