"use client";
import Image from "next/image";
import { type ListingEditRequired } from "~/types";
type listingProps = {
  listing: ListingEditRequired;
};

export default function Listing({ listing }: listingProps) {
  const { name, description, city, province, images } = listing;
  
  return (
    <div className="w-fll relative grid aspect-square h-full min-w-[335px] grid-rows-[1fr,auto] gap-3 overflow-hidden rounded-lg text-white sm:aspect-auto sm:grid-rows-[294px,auto]">
      <div className="relative isolate h-full w-full overflow-hidden">
        <Image
          src={
            images[0]?.url
              ? images[0]?.url
              : "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          }
          alt="listing image"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex h-full flex-col">
        <p className="text-white/60 ">{name}</p>
        <p className="flex items-end gap-2 font-medium">
          {province},{city}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}
