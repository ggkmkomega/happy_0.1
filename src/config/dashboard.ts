import { type DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Laws & Regulations",
      href: "/law",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Listings",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Reservations",
      href: "/dashboard/reservations",
      icon: "handshake",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    }
  ],
};
