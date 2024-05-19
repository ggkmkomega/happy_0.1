import { CardSkeleton } from "~/_components/card-skeleton";
import { DashboardHeader } from "~/_components/header";
import { DashboardShell } from "~/_components/shell";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
