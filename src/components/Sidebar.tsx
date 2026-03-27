import { ChevronLeft, LogOut, ShieldCheck } from "lucide-react";
import logo from "../assets/logo.png";
import { navItems } from "@/constant/constant";
import { useNavigate, useLocation } from "react-router-dom";

type SidebarProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
};

const Sidebar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeNav = location.pathname.replace("/", "");

  return (
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
        <img src={logo} alt="logo" />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path, badge }) => (
          <button
            key={path}
            onClick={() => {
              navigate(`/${path}`);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
              activeNav === path
                ? "bg-[#eff3ff] text-[#1e3a8a]"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <Icon
              size={18}
              className={activeNav === path ? "text-[#1e3a8a]" : ""}
            />

            {!sidebarCollapsed && (
              <>
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      activeNav === path
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
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500">
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>

        {!sidebarCollapsed && (
          <div
            className="flex items-center gap-3 mt-3 px-3 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <ShieldCheck size={14} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Welcome back 👋</p>
              <p className="text-sm font-semibold text-gray-700">
                Ahmed Mohamed
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Collapse */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border rounded-full items-center justify-center"
      >
        <ChevronLeft
          size={12}
          className={sidebarCollapsed ? "rotate-180" : ""}
        />
      </button>
    </aside>
  );
};

export default Sidebar;
