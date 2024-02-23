import { api } from "~/trpc/server";
import Listing from "./Listing";
import Link from "next/link";

export default async function Listings() {
  const listings = await api.listing.all.query();
  /*
  const { data: listings, isLoading, isError } = api.listing.all.useQuery();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }*/
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fill,minmax(335px,1fr))] justify-center gap-x-4 gap-y-7 px-4 sm:gap-y-6 ">
      {listings.length
        ? listings.map((listing) => {
            return (
              <Link href={`/listing/${listing.id}`} key={listing.id}>
                <Listing listing={listing} />
              </Link>
            );
          })
        : "Create the first Listing"}
    </div>
  );
}
