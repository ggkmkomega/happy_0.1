"use client";
import { EmptyPlaceholder } from "~/_components/empty-placeholder";
import { DashboardHeader } from "~/_components/header";
import { Listingcreatebutton } from "~/_components/listing-create-button";
import { ListingItem } from "~/_components/listing-item";
import { DashboardShell } from "~/_components/shell";
import { api } from "~/trpc/react";

/*
export const metadata = {
  title: "Dashboard",
};
*/
export default function DashboardPage() {
  const { data: listings } = api.listing.allUserListings.useQuery();

  return (
    <DashboardShell>
      <DashboardHeader heading="Listings" text="Create and manage Listings.">
        <Listingcreatebutton />
      </DashboardHeader>
      <div>
        {listings?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No listing created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any listings yet. Start your journey.
            </EmptyPlaceholder.Description>
            <Listingcreatebutton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
