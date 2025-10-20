import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "./routes/pedidos";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Pedidos API routes
  app.get("/api/pedidos", getPedidos);
  app.post("/api/pedidos", createPedido);
  app.patch("/api/pedidos/:id", updatePedido);
  app.delete("/api/pedidos/:id", deletePedido);

  return app;
}
