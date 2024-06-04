"use client";

import { Listing } from "@prisma/client";
import { CigaretteOff, Coffee, DollarSign, Heater, Home, MapPin, Snowflake, Users, Wifi } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "~/_components/ui/skeleton";
import { api } from "~/trpc/react";
import SearchBar from "../_components/SearchBar";
import Link from "next/link";
import amenities, { Amenity } from "~/data/ameneties";


const ListingDisplay = ({ listing }: { listing: Listing }) => {
    return (
        <div className="md:flex p-2 rounded border border-gray-400 bg-gray-100">
            <div className="md:w-[30%]">
                {listing.images.length > 0 ?
                    <Image className="rounded h-[40vh] w-full" alt="city image" width={300} height={300} src={listing.images[0].url} />
                    :
                    <></>
                }
            </div>

            <Link href={`/listings/${listing.id}`}>
                <div className="p-2">
                    <h1 className="text-2xl font-bold capitalize py-3">{listing.name}</h1>
                    <h2 className="text-md flex gap-x-1 py-1"><MapPin className="text-md" /> {listing.city} {" "} {listing.province} {" "} {listing.street}</h2>
                    <h2 className="text-md flex gap-x-1 py-1"><Home className="text-md" /> {listing.type}</h2>
                    <h2 className="text-md flex gap-x-1 py-1"><DollarSign className="text-md" /> {listing.price}.00 DZD</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 py-3">
                        {listing.Amenties.map((amenity: string) => {
                            // const Icon = amenities.find(item => item.name === amenity)?.icon;
                            const Icon = amenities[0]?.icon;
                            console.log(Icon);

                            return (
                                <div key={amenity}
                                    className="flex gap-x-1">
                                    <Icon className="text-green-600" />
                                    {amenity}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Link >
        </div>
    )
}

const Page = () => {
    const searchParams = useSearchParams()

    const { data, isLoading } = api.listing.filteredListings.useQuery({
        location: searchParams.get("location") || ""
    })

    console.log(data);

    return (
        <div className="w-11/12 mx-auto">
            <SearchBar />
            <div>
                <h1 className="text-3xl font-bold">Search Results:</h1>
                <p className="px-1 pb-4">Found {data?.length} results</p>
            </div>
            <div className="space-y-4">
                {isLoading ?
                    <div className="space-y-3">
                        <Skeleton className="w-full h-[80px]" />
                        <Skeleton className="w-full h-[80px]" />
                        <Skeleton className="w-full h-[80px]" />
                    </div>
                    :
                    data?.map(listing => {
                        return (
                            <ListingDisplay listing={listing} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Page;