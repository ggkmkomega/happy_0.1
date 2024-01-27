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
    <div className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(335px,1fr))] justify-center gap-x-4 gap-y-7 px-4 sm:gap-y-6 ">
      {listings.length
        ? listings.map((listing) => {
            return <Listing key={listing.id} listing={listing} />;
          })
        : "Create the first Listing"}
    </div>
  );
}
