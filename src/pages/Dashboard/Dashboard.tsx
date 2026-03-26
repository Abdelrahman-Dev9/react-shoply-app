import { ChartAreaDefault } from "@/components/AreaChart";
import BarChartComponent from "@/components/BarChart";
import Sidebar from "@/components/Sidebar";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import StatsGrid from "../../components/ShipmentStats";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div
      className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
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
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 min-w-0">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between md:hidden mb-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-gray-800 text-base">Dashboard</span>
          <div className="w-9" /> {/* spacer */}
        </div>

        {/* Shipment Overview */}
        <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-5">
            Shipment overview
          </h2>

          <StatsGrid />

          {/* Bar Chart header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ml-0 sm:ml-2 mt-4">
            <h3 className="text-[20px] font-semibold text-[#1E3A8A]">
              Shipment statistic
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-3.5 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-500">Total shipments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-3.5 rounded-full bg-[#1e3a8a]" />
                <span className="text-xs text-gray-500">Completed</span>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-[#1e3a8a] border border-[#c7d2fe] rounded-lg px-3 py-1.5 hover:bg-[#eff3ff] transition-colors">
                <ChevronDown size={12} />
                2024 Year
              </button>
            </div>
          </div>

          <hr className="w-full border-black my-5" />
          <BarChartComponent />
        </section>

        {/* Income Overview */}
        <ChartAreaDefault />
      </main>
    </div>
  );
};

export default Dashboard;
