import { notFound, redirect } from "next/navigation";
import { type Listing } from "@prisma/client";

import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

import ViewListing from "~/app/components/ViewListing";

async function getListingForUser(listingId: Listing["id"]) {
  const data = await api.listing.listingByUser.query(listingId);
  return data;
}

interface EditorPageProps {
  params: { listingId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerAuthSession();
  const user = session?.user;

  const listing = await getListingForUser(params.listingId);

  if (!listing) {
    notFound();
  }
  
  return (
    <div className="p-4">
      <ViewListing listing={listing as Listing} />
    </div>
  );
}
