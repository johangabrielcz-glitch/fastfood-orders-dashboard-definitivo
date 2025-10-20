import { Pedido } from "@shared/api";
import { Package, Truck, CheckCircle2 } from "lucide-react";

interface DashboardHeaderProps {
  pedidos: Pedido[];
}

export function DashboardHeader({ pedidos }: DashboardHeaderProps) {
  const pendientes = pedidos.filter((p) => p.estado === "pendiente").length;
  const enCamino = pedidos.filter((p) => p.estado === "en camino").length;
  const entregados = pedidos.filter((p) => p.estado === "entregado").length;

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Panel de Pedidos - FastFoodBot
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pendientes Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-900">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {pendientes}
              </p>
            </div>
            <div className="bg-yellow-200 rounded-full p-4">
              <Package className="w-8 h-8 text-yellow-900" />
            </div>
          </div>
        </div>

        {/* En Camino Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">En camino</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {enCamino}
              </p>
            </div>
            <div className="bg-blue-200 rounded-full p-4">
              <Truck className="w-8 h-8 text-blue-900" />
            </div>
          </div>
        </div>

        {/* Entregados Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Entregados</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {entregados}
              </p>
            </div>
            <div className="bg-green-200 rounded-full p-4">
              <CheckCircle2 className="w-8 h-8 text-green-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
