import { Pedido } from "@shared/api";
import { Truck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PedidoRowProps {
  pedido: Pedido;
  onStatusChange: (
    pedidoId: number,
    nuevoEstado: "en camino" | "entregado",
  ) => Promise<void>;
  isLoading: boolean;
}

export function PedidoRow({
  pedido,
  onStatusChange,
  isLoading,
}: PedidoRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getEstadoBadge = () => {
    switch (pedido.estado) {
      case "pendiente":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
            🟡 Pendiente
          </span>
        );
      case "en camino":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300">
            🔵 En camino
          </span>
        );
      case "entregado":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-300">
            🟢 Entregado
          </span>
        );
      default:
        return null;
    }
  };

  const handleEnCamino = async () => {
    if (pedido.estado !== "pendiente") return;
    setIsUpdating(true);
    try {
      await onStatusChange(pedido.id, "en camino");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEntregado = async () => {
    if (pedido.estado === "entregado") return;
    setIsUpdating(true);
    try {
      await onStatusChange(pedido.id, "entregado");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        #{pedido.id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{pedido.nombre}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{pedido.numero}</td>
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
        {pedido.pedido}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        ${pedido.total.toFixed(2)}
      </td>
      <td className="px-6 py-4 text-sm">{getEstadoBadge()}</td>
      <td className="px-6 py-4 text-sm space-x-2 flex gap-2">
        <button
          onClick={handleEnCamino}
          disabled={isLoading || isUpdating || pedido.estado !== "pendiente"}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
          title={
            pedido.estado !== "pendiente"
              ? "Solo pedidos pendientes pueden marcarse como en camino"
              : ""
          }
        >
          <Truck className="w-4 h-4" />
          En camino
        </button>

        <button
          onClick={handleEntregado}
          disabled={isLoading || isUpdating || pedido.estado === "entregado"}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
          title={
            pedido.estado === "entregado"
              ? "Este pedido ya ha sido entregado"
              : ""
          }
        >
          <CheckCircle2 className="w-4 h-4" />
          Entregado
        </button>
      </td>
    </tr>
  );
}
