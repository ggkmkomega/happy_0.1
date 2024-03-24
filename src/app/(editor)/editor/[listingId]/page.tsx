import { notFound, redirect } from "next/navigation";
import { type Listing } from "@prisma/client";

import { api } from "~/trpc/server";
import { authOptions, getServerAuthSession } from "~/server/auth";

import EditListings from "~/app/components/useListingForm";

async function getListingForUser(listingId: Listing["id"]) {
  const data = await api.listing.listingByUser.query(listingId);
  return data;
}


interface EditorPageProps {
  params: { listingId: string };
}


export default async function EditorPage({ params }: EditorPageProps) {

  // check if the user is signed in
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const listing = await getListingForUser(params.listingId);

  if (!listing) {
    notFound();
  }

  return (
    <div className="p-4">
      <EditListings existingListing={listing} />
    </div>
  );
}
