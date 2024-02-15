import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArchiveIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";

interface cardProps {
  src: string;
  title: string;
  desc: string;
}

const Picard = ({ src, title, desc }: cardProps) => {
  return (
    <div className="flex snap-center flex-col gap-y-3 px-2">
      <div className="group relative overflow-hidden rounded-md shadow-lg">
        <Image
          src={src}
          alt={`${title} picture`}
          width={808}
          height={632}
          className="brig transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
        />
        <div className="absolute top-0 flex w-full justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href=""
            className="flex items-center gap-x-2 rounded-3xl bg-gray-700 bg-opacity-70 px-3 py-2 text-gray-100"
          >
            <ArchiveIcon />
            <p className="text-xs">Save</p>
          </Link>
          <button className="-translate-y-2 transition-all duration-300 group-hover:translate-y-0">
            <BookmarkFilledIcon color="#ad9058" scale={25} />
          </button>
        </div>
      </div>
      <div className="flex flex-col text-gray-800">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs">{desc}</p>
      </div>
    </div>
  );
};

export default Picard;
