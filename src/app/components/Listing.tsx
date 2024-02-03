"use client";
import Image from "next/image";
import { type listing } from "~/types";
type listingProps = {
  listing: listing;
};

export default function Listing({ listing }: listingProps) {
  const { name, description, address } = listing;

  return (
    <div className="w-fll relative grid aspect-square h-full min-w-[335px] grid-rows-[1fr,auto] gap-3 overflow-hidden rounded-lg text-white sm:aspect-auto sm:grid-rows-[294px,auto]">
      <div className="relative isolate h-full w-full overflow-hidden">
        <Image
          src={"/placeholder.png"}
          alt="listing image"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex h-full flex-col">
        <p className="text-white/60 ">{name}</p>
        <p className="mb-0.5 flex items-end gap-2 font-medium">{address}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
