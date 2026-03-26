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
  { icon: LayoutDashboard, label: "Dashboard", badge: null, active: true },
  { icon: ClipboardList, label: "Order list", badge: 5, active: false },
  { icon: Package, label: "Products", badge: 5, active: false },
  { icon: Users, label: "Users", badge: 45, active: false },
  { icon: ShieldCheck, label: "Admins", badge: 10, active: false },
  { icon: Tag, label: "Categories", badge: 4, active: false },
  { icon: Bell, label: "Notifications", badge: 3, active: false },
  { icon: BarChart2, label: "Reports", badge: null, active: false },
];
