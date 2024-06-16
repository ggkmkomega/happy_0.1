import { notFound } from "next/navigation";
import { type Listing } from "@prisma/client";

import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ViewListing from "~/app/_components/ViewListing";

async function getListingForUser(id: Listing["id"]) {
  const data = await api.listing.getsingleListing.query(id);
  return data;
}
async function getDates(listingId: string) {
  const data =
    await api.reservation.getReservedDatesForAlisting.query(listingId);
  return data;
}
interface SingleListingPageProps {
  params: { id: string };
}

export default async function Page({ params }: SingleListingPageProps) {
  const session = await getServerAuthSession();
  const user = session?.user;

  const listing = await getListingForUser(params.id);

  if (!listing) {
    notFound();
  }
  const dbDates = await getDates(params.id);

  return (
    <div className="p-4">
      <ViewListing dates={dbDates} listing={listing} />
    </div>
  );
}

// TODO
// make the scrolling smoother
// list property button should lead to the dashboard | singin depending on the auth state
// when creating a new listing it redirects to editor/undefined
// images from diffrent listings appear on the preview of new listings
