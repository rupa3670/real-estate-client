import {
  LayoutDashboard,
  Users,
  Building2,
  HardHat,
  Hammer,
  Package,
  HandCoins,
  CreditCard,
  Receipt,
  BarChart3,
  UserCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type Role = "admin" | "manager" | "accountant";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
};

export type SidebarGroup = {
  title?: string;
  items: SidebarItem[];
};

export const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "manager", "accountant"],
      },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
      {
        label: "Projects",
        href: "/dashboard/projects",
        icon: Building2,
        roles: ["admin", "manager"],
      },
      {
        label: "Engineers",
        href: "/dashboard/engineers",
        icon: HardHat,
        roles: ["admin"],
      },
      { label: "Mesons", href: "/dashboard/meson", icon: Hammer, roles: ["admin"] },
      {
        label: "Materials",
        href: "/dashboard/materials",
        icon: Package,
        roles: ["admin", "manager"],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        label: "Fund Requests",
        href: "/dashboard/fund-requests",
        icon: HandCoins,
        roles: ["admin", "manager", "accountant"],
      },
      {
        label: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
        roles: ["admin", "accountant"],
      },
      {
        label: "Expenses",
        href: "/dashboard/expenses",
        icon: Receipt,
        roles: ["admin", "accountant"],
      },
    ],
  },
  {
    title: "Insights",
    items: [
      {
        label: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: UserCircle,
        roles: ["admin", "manager", "accountant"],
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ],
  },
];