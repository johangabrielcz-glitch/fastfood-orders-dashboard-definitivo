import { Pedido } from "@shared/api";
import { PedidoRow } from "./PedidoRow";
import { AlertCircle } from "lucide-react";

interface PedidoTableProps {
  pedidos: Pedido[];
  onStatusChange: (
    pedidoId: number,
    nuevoEstado: "en camino" | "entregado",
  ) => Promise<void>;
  isLoading: boolean;
}

export function PedidoTable({
  pedidos,
  onStatusChange,
  isLoading,
}: PedidoTableProps) {
  if (pedidos.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No hay pedidos en este momento</p>
        <p className="text-gray-500 text-sm mt-2">
          Los pedidos aparecerán aquí cuando se reciban desde BuilderBot
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <PedidoRow
                key={pedido.id}
                pedido={pedido}
                onStatusChange={onStatusChange}
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 text-sm text-gray-600">
        Total de pedidos:{" "}
        <span className="font-semibold">{pedidos.length}</span>
      </div>
    </div>
  );
}
