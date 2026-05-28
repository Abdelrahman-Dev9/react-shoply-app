import { ChevronDown } from "lucide-react";

import ChartAreaDefault from "@/components/dashboard/AreaChart";
import BarChartComponent from "@/components/dashboard/BarChart";
import StatsGrid from "@/components/dashboard/ShipmentStats";

const DashboardHome = () => {
  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Shipment overview</h2>

        <StatsGrid />

        <div className="flex items-center justify-between mt-6">
          <h3 className="text-xl font-semibold text-[#1E3A8A]">
            Orders statistic
          </h3>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[15px] font-semibold text-[#1E3A8A]">
                Total Orders
              </span>
              <div className="w-10 h-6 rounded-full border-2 border-[#c7d2fe] bg-[#c7d2fe]" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[15px] font-semibold text-[#1E3A8A]">
                Completed
              </span>
              <div className="w-10 h-6 rounded-full border-2 border-[#1e3a8a] bg-[#1e3a8a]" />
            </div>

            <button className="flex items-center gap-1 text-xs text-[#1e3a8a] border px-3 py-1.5 rounded-lg">
              <ChevronDown size={12} />
              2024
            </button>
          </div>
        </div>

        <BarChartComponent />
      </section>

      <ChartAreaDefault />
    </div>
  );
};

export default DashboardHome;
