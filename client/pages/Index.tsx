import { useEffect, useState, useCallback } from "react";
import { Pedido } from "@shared/api";
import { DashboardHeader } from "@/components/DashboardHeader";
import { PedidoTable } from "@/components/PedidoTable";
import { RefreshCw } from "lucide-react";

const REFRESH_INTERVAL = 7000; // 7 seconds

export default function Index() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Fetch all pedidos from the API
  const fetchPedidos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/pedidos");

      if (!response.ok) {
        throw new Error("Error fetching pedidos");
      }

      const data = (await response.json()) as Pedido[];
      setPedidos(data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Error fetching pedidos:", err);
      setError(
        err instanceof Error ? err.message : "Error fetching pedidos"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle status change
  const handleStatusChange = useCallback(
    async (pedidoId: number, nuevoEstado: "en camino" | "entregado") => {
      try {
        const response = await fetch(`/api/pedidos/${pedidoId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        });

        if (!response.ok) {
          throw new Error("Error updating pedido");
        }

        const updatedPedido = (await response.json()) as {
          ok: boolean;
          data: Pedido;
        };

        // Update local state with the new pedido data
        setPedidos((prev) =>
          prev.map((p) =>
            p.id === pedidoId ? updatedPedido.data : p
          )
        );
      } catch (err) {
        console.error("Error updating pedido:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error updating pedido"
        );
      }
    },
    []
  );

  // Initial fetch on component mount
  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  // Set up auto-refresh interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPedidos();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchPedidos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Header with Stats */}
        <DashboardHeader pedidos={pedidos} />

        {/* Refresh Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw className="w-4 h-4" />
            <span>
              Última actualización:{" "}
              <span className="font-medium">
                {lastRefresh.toLocaleTimeString("es-ES")}
              </span>
            </span>
          </div>
          <button
            onClick={fetchPedidos}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
        </div>

        {/* Pedidos Table */}
        <PedidoTable
          pedidos={pedidos}
          onStatusChange={handleStatusChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
