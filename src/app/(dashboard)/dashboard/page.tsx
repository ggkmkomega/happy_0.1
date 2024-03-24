"use client";
//import { redirect } from "next/navigation";
import { EmptyPlaceholder } from "~/components/empty-placeholder";
import { DashboardHeader } from "~/components/header";
import { Listingcreatebutton } from "~/components/listing-create-button";
import { ListingItem } from "~/components/listing-item";
import { DashboardShell } from "~/components/shell";

//import { authOptions, getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

/*
export const metadata = {
  title: "Dashboard",
};
*/
export default function DashboardPage() {
  /*const session =  await getServerAuthSession();
  //const session = useSession();

  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
*/

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
