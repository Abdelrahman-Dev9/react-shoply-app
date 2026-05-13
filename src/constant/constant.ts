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
import z from "zod";

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

export type PasswordKey = "current" | "newPass" | "confirm";

export const infoFields = [
  { label: "Name", key: "name", placeholder: "Ahmed Mohamed" },
  { label: "Email", key: "email", placeholder: "ahmedmohamed@gmail.com" },
  { label: "Phone", key: "phone", placeholder: "0102467112" },
] as const;

export const passwordFields = [
  { label: "Current password", key: "current" },
  { label: "New Password", key: "newPass" },
  { label: "Confirm new password", key: "confirm" },
] as const;

export const profileSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email"),
    phone: z.string().min(10, "Invalid phone number"),
    current: z.string().optional(),
    newPass: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPass && data.newPass !== data.confirm) return false;
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirm"],
    }
  );
export type ProfileFormData = z.infer<typeof profileSchema>;
