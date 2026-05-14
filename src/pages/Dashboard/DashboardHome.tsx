import { ChevronDown } from "lucide-react";

import StatsGrid from "@/components/ShipmentStats";
import BarChartComponent from "@/components/BarChart";
import { ChartAreaDefault } from "@/components/AreaChart";

const DashboardHome = () => {
  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Shipment overview</h2>

        <StatsGrid />

        <div className="flex justify-between mt-6">
          <h3 className="text-xl font-semibold text-[#1E3A8A]">
            Shipment statistic
          </h3>

          <button className="flex items-center gap-1 text-xs text-[#1e3a8a] border px-3 py-1.5 rounded-lg">
            <ChevronDown size={12} />
            2024
          </button>
        </div>

        <BarChartComponent />
      </section>

      <ChartAreaDefault />
    </div>
  );
};

export default DashboardHome;
