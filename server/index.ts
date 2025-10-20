import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { handleDemo } from "./routes/demo";
import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "./routes/pedidos";

// Estas 2 líneas son necesarias para usar __dirname con módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 📦 Servir el frontend compilado
  const clientPath = path.join(__dirname, "../../dist/spa");
  app.use(express.static(clientPath));

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/pedidos", getPedidos);
  app.post("/api/pedidos", createPedido);
  app.patch("/api/pedidos/:id", updatePedido);
  app.delete("/api/pedidos/:id", deletePedido);

  // ⚠️ Ruta catch-all para SPA (arregla el error anterior)
  app.get("/*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });

  return app;
}
