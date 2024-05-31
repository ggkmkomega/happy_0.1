import { CardSkeleton } from "~/_components/card-skeleton";
import { DashboardHeader } from "~/_components/header";
import { DashboardShell } from "~/_components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Reservation"
        text="Browse Your reservations."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
