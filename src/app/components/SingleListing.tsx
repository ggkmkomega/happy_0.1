import { RulerHorizontalIcon } from "@radix-ui/react-icons";
import { ArrowRight, Bath, BedDouble, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleListing: React.FC = () => {
  return (
    <div className=" absolute max-w-sm overflow-hidden rounded-3xl bg-white font-bold shadow-lg">
      <div className="absolute right-3 top-3 mr-2 mt-2 flex justify-end rounded-md bg-white p-2">
        <Heart className="  h-6 w-6 fill-current text-red-500" />
      </div>
      <Image
        className="w-full rounded-3xl"
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        width={300}
        height={200}
        alt="Listing Image"
      />

      <div className="flex items-center justify-between px-6 py-4">
        <div className=" text-2xl font-bold">$80,000</div>
        <div>
          <Link
            href="/"
            className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Go
            <ArrowRight className="h-6 w-6 " />
          </Link>
        </div>
      </div>
      <div className="px-6">
        <div className="text-gray-400">
          Lorem, ipsum dolor sit amet consectetur .
        </div>
      </div>
      <div className="flex items-center justify-around gap-2 px-6 py-4">
        <div className="flex items-center justify-center p-2 text-sm  ">
          <RulerHorizontalIcon className="mr-2 h-6 w-6" />
          <span>300 m²</span>
        </div>
        <div className="flex items-center justify-center p-2 text-sm ">
          <BedDouble className="mr-2 h-6 w-6 " />
          <span className="">3</span>
        </div>
        <div className="flex items-center justify-center p-2 text-sm ">
          <Bath className="mr-2 h-6 w-6 " />
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
