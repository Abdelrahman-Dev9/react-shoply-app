import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import StatsGrid from "@/components/ShipmentStats";
import BarChartComponent from "@/components/BarChart";
import { ChartAreaDefault } from "@/components/AreaChart";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-[#f0f4ff] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
          <span className="font-bold">Dashboard</span>
          <div />
        </div>

        {/* Only dashboard content */}
        {isDashboard && (
          <>
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
          </>
        )}

        {/* Pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
