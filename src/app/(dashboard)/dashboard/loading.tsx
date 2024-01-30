import { DashboardHeader } from "~/components/header";
import { Listingcreatebutton } from "~/components/listing-create-button";
import { ListingItem } from "~/components/listing-item";
import { DashboardShell } from "~/components/shell";

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
