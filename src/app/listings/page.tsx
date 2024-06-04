"use client";

import { DollarSign, Home, MapPin } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "~/_components/ui/skeleton";
import { api } from "~/trpc/react";
import SearchBar from "../_components/SearchBar";
import Link from "next/link";
import amenities from "~/data/ameneties";
import { type FiltredListing } from "~/types";

const ListingDisplay = ({ listing }: { listing: FiltredListing }) => {
  return (
    <div className="rounded border border-gray-400 bg-gray-100 p-2 md:flex">
      <div className="md:w-[30%]">
        {listing.images.length > 0 ? (
          <Image
            className="h-[40vh] w-full rounded"
            alt="city image"
            width={300}
            height={300}
            src={listing.images[0]?.url ?? "/placeholder.jpg"}
          />
        ) : (
          <></>
        )}
      </div>

      <Link href={`/listings/${listing.id}`}>
        <div className="p-2">
          <h1 className="py-3 text-2xl font-bold capitalize">{listing.name}</h1>
          <h2 className="text-md flex gap-x-1 py-1">
            <MapPin className="text-md" /> {listing.city} {listing.province}{" "}
            {listing.street}
          </h2>
          <h2 className="text-md flex gap-x-1 py-1">
            <Home className="text-md" /> {listing.type}
          </h2>
          <h2 className="text-md flex gap-x-1 py-1">
            <DollarSign className="text-md" /> {listing.price}.00 DZD
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-3">
            {listing.Amenties.map((amenity: string) => {
              const Icon = amenities.find(
                (item) => item.name === amenity,
              )?.icon;
              if (!Icon) return null;

              return (
                <div key={amenity} className="flex gap-x-1">
                  <Icon className="text-green-600" />
                  {amenity}
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Page = () => {
  const searchParams = useSearchParams();

  const { data, isLoading } = api.listing.filteredListings.useQuery({
    location: searchParams.get("location") ?? "",
  });

  console.log(data);

  return (
    <div className="mx-auto w-11/12">
      <SearchBar />
      <div>
        <h1 className="text-3xl font-bold">Search Results:</h1>
        <p className="px-1 pb-4">Found {data?.length} results</p>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
          </div>
        ) : (
          data?.map((listing) => {
            return <ListingDisplay key={listing.id} listing={listing} />;
          })
        )}
      </div>
    </div>
  );
};

export default Page;
