import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/_components/ui/button";
import LocationCardGroup from "./LocationCardGroup";
import { api } from "~/trpc/server";

const countries = [
  {
    name: "Souk Ahras",
    link: "/listings?location=Souk+Ahras",
  },
  {
    name: "Batna",
    link: "/listings?location=Batna",
  },
  {
    name: "Adrar",
    link: "/listings?location=Adrar",
  },
  {
    name: "Oran",
    link: "/listings?location=Oran",
  },
];

const LocationsDisplay = () => {
  return (
    <div className="px-2">
      <div className="md:px-5">
        <h1 className="pt-4 text-3xl font-bold capitalize">
          Top-Rated Places In Algeria
        </h1>
        <p className="py-2 capitalize text-gray-500">
          Explore Trendsetting villas across the country for unforgettable escapes
        </p>
        <div className="flex justify-between gap-2 py-4">
          <div className="hidden gap-2 md:flex">
            {countries.map((item) => {
              return (
                <Link key={item.link} href={`${item.link}`}>
                  <Button className="rounded-[2px] bg-gray-200 text-black hover:bg-gray-300 hover:text-black">
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="hidden md:block">
            <Button variant={"outline"} className="text-md">
              <Link href={"/listings"}>
                <div className="flex items-center px-1">
                  See All
                  <MoveRightIcon className="ps-2" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <LocationCardGroup />
      </div>
      <div className="py-5">
        <Button variant={"outline"} className="text-md w-full md:hidden">
          <div className="flex items-center px-1">
            <Link href={"/listings"}>
              See All
              <MoveRightIcon className="ps-2" />
            </Link>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LocationsDisplay;
