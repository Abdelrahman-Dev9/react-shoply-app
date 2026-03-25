import {
  BarChart2,
  Bell,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import logo from "../../assets/logo.png";
import StatsGrid from "../../components/ShipmentStats";

type ShipmentData = {
  month: string;
  total: number;
  completed: number;
};

type IncomeData = {
  month: string;
  value: number;
};

type TooltipProps = {
  active?: boolean;
  payload?: { name: string; value: number; color?: string }[];
  label?: string;
};

const shipmentData: ShipmentData[] = [
  { month: "Jan", total: 1200, completed: 900 },
  { month: "Feb", total: 200, completed: 150 },
  { month: "Mar", total: 1600, completed: 1100 },
  { month: "Apr", total: 600, completed: 400 },
  { month: "May", total: 800, completed: 550 },
  { month: "Jun", total: 2000, completed: 1400 },
  { month: "Jul", total: 900, completed: 600 },
  { month: "Aug", total: 700, completed: 500 },
  { month: "Sep", total: 1100, completed: 800 },
  { month: "Oct", total: 1500, completed: 1100 },
  { month: "Nov", total: 400, completed: 300 },
  { month: "Dec", total: 1300, completed: 950 },
];

const incomeData: IncomeData[] = [
  { month: "Jan", value: 380 },
  { month: "Feb", value: 490 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 430 },
  { month: "May", value: 410 },
  { month: "Jun", value: 380 },
  { month: "Jul", value: 510 },
  { month: "Aug", value: 370 },
  { month: "Sep", value: 270 },
  { month: "Oct", value: 175 },
  { month: "Nov", value: 305 },
  { month: "Dec", value: 270 },
];

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

const CustomBarTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="capitalize">
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-[#1e3a8a] font-bold">${payload[0].value}k</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div
      className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-white shadow-sm transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        } shrink-0`}
      >
        {/* Logo */}
        <div className="pt-2 ">
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
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                activeNav === label
                  ? "bg-[#eff3ff] text-[#1e3a8a]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon
                size={18}
                className={activeNav === label ? "text-[#1e3a8a]" : ""}
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

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10"
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
      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Shipment Overview */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-5">
            Shipment overview
          </h2>

          {/* Stats Cards */}
          <StatsGrid />
          {/* Bar Chart */}
          <div>
            <div className="flex justify-center gap-[600px]  ml-8">
              <h3 className="text-[22px] font-semibold text-[#1E3A8A]">
                Shipment statistic
              </h3>
              <div className="flex items-center gap-4">
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
            <hr className="w-[85%] border-black my-5 mx-auto " />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={shipmentData} barGap={2} barCategoryGap="30%">
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  domain={[0, 3000]}
                  ticks={[0, 1000, 2000, 3000]}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={false} />
                <Bar
                  dataKey="total"
                  fill="#c7d2fe"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={20}
                />
                <Bar
                  dataKey="completed"
                  fill="#1e3a8a"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Income Overview */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Income Overview</h3>
            <button className="flex items-center gap-1.5 bg-[#1e3a8a] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors">
              2024
              <ChevronDown size={13} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={incomeData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                domain={[100, 550]}
                ticks={[100, 200, 300, 400, 500]}
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1e3a8a"
                strokeWidth={2.5}
                fill="url(#incomeGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#1e3a8a", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
