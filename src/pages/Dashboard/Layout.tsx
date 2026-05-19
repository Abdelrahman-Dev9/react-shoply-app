import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f0f4ff] overflow-hidden">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between md:hidden mb-4">
          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>

          <span className="font-bold">Dashboard</span>

          <div />
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
