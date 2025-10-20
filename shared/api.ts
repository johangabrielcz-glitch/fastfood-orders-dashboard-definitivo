/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export type EstadoPedido = "pendiente" | "en camino" | "entregado";

export interface Pedido {
  id: number;
  nombre: string;
  numero: string;
  pedido: string;
  total: number;
  estado: EstadoPedido;
  createdAt?: string;
}

export interface CrearPedidoRequest {
  id: number;
  nombre: string;
  numero: string;
  pedido: string;
  total: number;
  estado?: EstadoPedido;
}

export interface ActualizarPedidoRequest {
  estado: EstadoPedido;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  mensaje?: string;
  data?: T;
}
