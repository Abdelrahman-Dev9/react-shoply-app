import {
  BarChart2,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "dashboard", badge: null },
  { icon: ClipboardList, label: "Order List", path: "orderList", badge: 5 },
  { icon: Package, label: "Products", path: "products", badge: 5 },
  { icon: Users, label: "Users", path: "users", badge: 45 },
  { icon: ShieldCheck, label: "Admins", path: "admins", badge: 10 },
  { icon: Tag, label: "Categories", path: "categories", badge: 4 },
  { icon: Bell, label: "Notifications", path: "notifications", badge: 3 },
  { icon: BarChart2, label: "Reports", path: "reports", badge: null },
];
