import { notFound, redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

import EditListing from "~/app/_components/NewEditListing";

async function getListingForUser(listingId: string) {
  const data = await api.listing.listingByUser.query(listingId);
  return data;
}
async function getListingForAdmin(listingId: string) {
  const data = await api.listing.listingByAdmin.query(listingId);
  return data;
}

interface EditorPageProps {
  params: { listingId: string };
  searchParams: { admin?: string };
}

export default async function EditorPage({
  params,
  searchParams,
}: EditorPageProps) {
  // check if the user is signed in
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  if (searchParams.admin !== "true") {
    const listing = await getListingForUser(params.listingId);

    if (!listing) {
      notFound();
    }
    return (
      <div className="p-4">
        <EditListing existingListing={listing} />
      </div>
    );
  } else {
    const listing = await getListingForAdmin(params.listingId);

    if (!listing) {
      notFound();
    }
    return (
      <div className="p-4">
        <EditListing existingListing={listing} />
      </div>
    );
  }
}
