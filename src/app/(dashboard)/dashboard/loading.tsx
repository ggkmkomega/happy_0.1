import { DashboardHeader } from "~/_components/header";
import { Listingcreatebutton } from "~/_components/listing-create-button";
import { ListingItem } from "~/_components/listing-item";
import { DashboardShell } from "~/_components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <Listingcreatebutton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
