import { RequestHandler } from "express";
import {
  Pedido,
  CrearPedidoRequest,
  ActualizarPedidoRequest,
  ApiResponse,
} from "@shared/api";

// In-memory storage for pedidos
let pedidos: Pedido[] = [];
let nextId = 1;

// GET /api/pedidos - Get all pedidos
export const getPedidos: RequestHandler = (_req, res) => {
  res.json(pedidos);
};

// POST /api/pedidos - Create a new pedido
export const createPedido: RequestHandler = (req, res) => {
  const { nombre, numero, pedido, total, id, estado }: CrearPedidoRequest =
    req.body;

  if (!nombre || !numero || !pedido || total === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "Faltan campos requeridos",
    } as ApiResponse);
    return;
  }

  const newPedido: Pedido = {
    id: id || nextId++,
    nombre,
    numero,
    pedido,
    total,
    estado: estado || "pendiente",
    createdAt: new Date().toISOString(),
  };

  pedidos.push(newPedido);

  res.status(201).json({
    ok: true,
    mensaje: "Pedido recibido",
    data: newPedido,
  } as ApiResponse<Pedido>);
};

// PATCH /api/pedidos/:id - Update pedido status
export const updatePedido: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { estado }: ActualizarPedidoRequest = req.body;

  if (!estado) {
    res.status(400).json({
      ok: false,
      mensaje: "Estado es requerido",
    } as ApiResponse);
    return;
  }

  const pedido = pedidos.find((p) => p.id === parseInt(id));

  if (!pedido) {
    res.status(404).json({
      ok: false,
      mensaje: "Pedido no encontrado",
    } as ApiResponse);
    return;
  }

  pedido.estado = estado;

  res.json({
    ok: true,
    mensaje: "Pedido actualizado",
    data: pedido,
  } as ApiResponse<Pedido>);
};

// DELETE /api/pedidos/:id - Delete a pedido (optional, for cleanup)
export const deletePedido: RequestHandler = (req, res) => {
  const { id } = req.params;

  const index = pedidos.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({
      ok: false,
      mensaje: "Pedido no encontrado",
    } as ApiResponse);
    return;
  }

  const deletedPedido = pedidos.splice(index, 1)[0];

  res.json({
    ok: true,
    mensaje: "Pedido eliminado",
    data: deletedPedido,
  } as ApiResponse<Pedido>);
};
