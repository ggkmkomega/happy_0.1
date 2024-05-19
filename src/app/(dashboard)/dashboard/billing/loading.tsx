import { CardSkeleton } from "~/_components/card-skeleton";
import { DashboardHeader } from "~/_components/header";
import { DashboardShell } from "~/_components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
