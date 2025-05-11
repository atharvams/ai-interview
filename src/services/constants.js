import {
  Calendar,
  LayoutDashboard,
  List,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All interviews",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: ReceiptIndianRupee,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
