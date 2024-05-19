import { type DashboardConfig } from "types";

export const AdminConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Site Config",
      href: "/law",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Listings",
      href: "/admin",
      icon: "post",
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "user",
    },
    {
      title: "Reservations",
      href: "/admin/reservations",
      icon: "handshake",
    },
  ],
};
