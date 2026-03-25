import { ChartAreaDefault } from "@/components/AreaChart";
import BarChartComponent from "@/components/BarChart";
import {
  BarChart2,
  Bell,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import StatsGrid from "../../components/ShipmentStats";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", badge: null, active: true },
  { icon: ClipboardList, label: "Order list", badge: 5, active: false },
  { icon: Package, label: "Products", badge: 5, active: false },
  { icon: Users, label: "Users", badge: 45, active: false },
  { icon: ShieldCheck, label: "Admins", badge: 10, active: false },
  { icon: Tag, label: "Categories", badge: 4, active: false },
  { icon: Bell, label: "Notifications", badge: 3, active: false },
  { icon: BarChart2, label: "Reports", badge: null, active: false },
];

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
      <aside
        className={`
          fixed md:relative z-30 flex flex-col bg-white shadow-sm h-full
          transition-all duration-300 ease-in-out shrink-0
          ${sidebarCollapsed ? "md:w-20" : "md:w-64"}
          ${
            mobileOpen
              ? "w-64 translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-2 pt-2">
          <div className="flex items-center gap-1.5">
            {/* Priceo logo icon */}

            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              onClick={() => {
                setActiveNav(label);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                activeNav === label
                  ? "bg-[#eff3ff] text-[#1e3a8a]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon
                size={18}
                className={
                  activeNav === label ? "text-[#1e3a8a] shrink-0" : "shrink-0"
                }
              />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{label}</span>
                  {badge && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        activeNav === label
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-gray-100 pt-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all">
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 mt-3 px-3">
              <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0">
                <ShieldCheck size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 truncate">
                  Welcome back 👋
                </p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  Ahmed Mohamed
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all z-10"
        >
          <ChevronLeft
            size={12}
            className={`text-gray-500 transition-transform ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

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
