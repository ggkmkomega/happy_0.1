import { DashboardShell } from "~/_components/shell";
import { DashboardHeader } from "~/_components/header";
import { UsersRow } from "~/app/_components/AdminUser";

export default function reservations() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage Users." />
      <UsersRow />
    </DashboardShell>
  );
}
