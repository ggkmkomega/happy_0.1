"use client";

import { api } from "~/trpc/react";
import Listing from "./Listing";

export default function Listings() {
  const { data: listings, isLoading, isError } = api.listing.all.useQuery();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {listings.length
        ? listings.map((listing) => {
            return <Listing key={listing.id} listing={listing} />;
          })
        : "Create the first Listing"}
    </>
  );
}
