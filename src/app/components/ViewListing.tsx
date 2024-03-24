import React from "react";
import { Listing } from "@prisma/client";

function ViewListing({ listing }: { listing: Listing }) {
  
  console.log(listing.images);

  return (
    <>
      <div>ViewListings</div>
      <div></div>
    </>
  );
}

export default ViewListing;
